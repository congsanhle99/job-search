from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import JobSerializer
from .models import Job

# Create your views here.
# define endpoint


@api_view(['GET'])
# get all jobs
def getAllJobs(request):
    jobs = Job.objects.all()
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getJob(request, pk):
    # jobs = Job.objects.get(id=pk)
    jobs = get_object_or_404(Job, id=pk)
    serializer = JobSerializer(jobs, many=False)
    return Response(serializer.data)
