from django.urls import path, include
from .api import requisitionAPI, ScheduleProtocolAPI, ProtocolDetail, ArchiveAPI, CalendarEventAPI, \
    FinishProtocolAPI, CalendarEventEarlyCompleteAPI, ScheduleProtocolPageAPI, DenyProtocolAPI
from . import views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/requisition', requisitionAPI.as_view()),
    path('api/auth/scheduleProtocol', ScheduleProtocolAPI.as_view()),
    path('api/auth/scheduleProtocolPage', ScheduleProtocolPageAPI.as_view()),
    path('api/auth/finishProtocol', FinishProtocolAPI.as_view()),
    path('api/auth/scheduleProtocol/<int:pk>', ScheduleProtocolAPI.as_view()),
    path('api/auth/requisition', views.protocolManagementView,
         name="protocolManagementView"),
    # path('api/auth/calendarSchedule', CalendarScheduleAPI.as_view()),
    path('api/auth/archive', ArchiveAPI.as_view()),
    #path('api/auth/calendarSchedule/<str:sort>', CalendarScheduleAPI.as_view()),
    path('api/auth/protocolDetail', ProtocolDetail.as_view()),
    path('api/auth/calendarEvents', CalendarEventAPI.as_view()),
    path('api/auth/earlyCompleteCalendarEvent', CalendarEventEarlyCompleteAPI.as_view()),
    path('api/auth/denyProtocol', DenyProtocolAPI.as_view()),

]
