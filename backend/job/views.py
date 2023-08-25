from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Avg, Min, Max, Count
from .serializers import JobSerializer
from .models import Job
from .filters import JobFilter
# Create your views here.
# define endpoint


@api_view(['GET'])
# get all jobs
def getAllJobs(request):
    filterSet = JobFilter(
        request.GET, queryset=Job.objects.all().order_by('id'))
    serializer = JobSerializer(filterSet.qs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getJob(request, pk):
    # jobs = Job.objects.get(id=pk)
    job = get_object_or_404(Job, id=pk)
    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def newJob(request):
    data = request.data
    job = Job.objects.create(**data)
    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateJob(request, pk):
    job = get_object_or_404(Job, id=pk)
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
def deleteJob(request, pk):
    job = get_object_or_404(Job, id=pk)
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
