from django.shortcuts import render
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
