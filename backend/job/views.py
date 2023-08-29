from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Avg, Min, Max, Count
from .serializers import JobSerializer
from .models import CandidatesApplied, Job
from .filters import JobFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
# Create your views here.
# define endpoint


@api_view(['GET'])
# get all jobs
def getAllJobs(request):
    filterSet = JobFilter(
        request.GET, queryset=Job.objects.all().order_by('id'))
    count = filterSet.qs.count()
    # pagination
    resPerPage = 3
    paginator = PageNumberPagination()
    paginator.page_size = resPerPage
    querySet = paginator.paginate_queryset(filterSet.qs, request)
    #
    serializer = JobSerializer(querySet, many=True)
    return Response({
        'count': count,
        'resPerPage': resPerPage,
        'jobs': serializer.data
    })


@api_view(['GET'])
def getJob(request, pk):
    # jobs = Job.objects.get(id=pk)
    job = get_object_or_404(Job, id=pk)
    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def newJob(request):
    request.data['user'] = request.user
    print("request.user: ", request.user)
    print("request.data['user']:: ", request.data['user'])
    data = request.data
    job = Job.objects.create(**data)
    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateJob(request, pk):
    job = get_object_or_404(Job, id=pk)

# Only the user who created this job has the authority to update it
    if job.user != request.user:
        return Response({'message': 'You can not update this job!'},
                        status=status.HTTP_403_FORBIDDEN)

    job.title = request.data['title']
    job.description = request.data['description']
    job.email = request.data['email']
    job.address = request.data['address']
    job.jobType = request.data['jobType']
    job.education = request.data['education']
    job.industry = request.data['industry']
    job.experience = request.data['experience']
    job.salary = request.data['salary']
    job.positions = request.data['positions']
    job.company = request.data['company']

    job.save()

    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    if job.user != request.user:
        return Response({'message': 'You can not delete this job!'},
                        status=status.HTTP_403_FORBIDDEN)

    job.delete()

    return Response({'message': 'Job is deleted!!!'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def getTopicStats(request, topic):
    args = {'title__icontains': topic}
    print("args: ", args)
    jobs = Job.objects.filter(**args)
    print("jobs: ", jobs)

    if len(jobs) == 0:
        return Response({'message': 'Not stats found for {topic}'.format(topic=topic)})

    stats = jobs.aggregate(
        total_jobs=Count('title'),
        avg_positions=Avg('positions'),
        avg_salary=Avg('salary'),
        min_salary=Min('salary'),
        max_salary=Max('salary'),
    )

    return Response(stats)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def applyToJob(request, pk):
    user = request.user
    job = get_object_or_404(Job, id=pk)

    if user.userprofile.resume == '':
        print("user.userprofile.resume: ", user.userprofile.resume)
        return Response({'error': 'Please upload your resume first!'},
                        status=status.HTTP_400_BAD_REQUEST)

    if job.lastDate < timezone.now():
        return Response({'error': 'You can not apply to this job. Date is over!'},
                        status=status.HTTP_400_BAD_REQUEST)

    alreadyApplied = job.candidatesapplied_set.filter(user=user).exists()

    if alreadyApplied:
        return Response({'error': 'You have already apply to this job!'},
                        status=status.HTTP_400_BAD_REQUEST)

    jobApplied = CandidatesApplied.objects.create(
        job=job,
        user=user,
        resume=user.userprofile.resume,
    )

    return Response({
        'applied': True,
        'job_id': jobApplied.id
    },
        status=status.HTTP_200_OK
    )
