import { PLATFORM } from "aurelia-pal";
import { Router, RouterConfiguration } from "aurelia-router";
import environment from "./environment";
import { autoinject } from "aurelia-framework";
import { CourseRepo } from "./services/course/course-repo";
import { NavigatorProperties } from "./resources/elements/navigators/navigator-properties";
import { GoogleAnalytics } from "./services/analytics/google-analytics";
import { AnalyticsService } from "./services/analytics/analytics-service";
import { EventBus } from "./services/events/event-bus";

@autoinject
export class App {
  title = 'Tutors';
  live = false;

  constructor(private navigatorProperties: NavigatorProperties,
              private courseRepo : CourseRepo,
              private ga: GoogleAnalytics,
              private as: AnalyticsService,
              private eb : EventBus) {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Tutors';
    config.options.pushState = environment.pushState;
    config.options.root = '/';
    config.map ([
      { route: '',                          moduleId: PLATFORM.moduleName('./components/main/main-view'),        name: 'start',   title: 'Module' },
      { route: 'course/*courseurl',         moduleId: PLATFORM.moduleName('./components/course/course-view'),    name: 'course',  title: 'Module' },
      { route: 'topic/*topicurl',           moduleId: PLATFORM.moduleName('./components/topic/topic-view'),      name: 'topic',   title: 'Topic' },
      { route: 'lab/*laburl/:step?',        moduleId: PLATFORM.moduleName('./components/lab/lab-view'),          name: 'lab',     title: 'Lab' },
      { route: 'video/*courseUrl/:videoid', moduleId: PLATFORM.moduleName('./components/video/video-view'),      name: 'video',   title: 'Video' },
      { route: 'talk/*courseUrl/:talkid',   moduleId: PLATFORM.moduleName('./components/talk/talk-view'),        name: 'talk',    title: 'Talk' },
      { route: 'talks/*courseurl',          moduleId: PLATFORM.moduleName('./components/wall/wall-view'),        name: 'talk',    title: 'Talks' },
      { route: 'labs/*courseurl',           moduleId: PLATFORM.moduleName('./components/wall/wall-view'),        name: 'lab',     title: 'Labs' },
      { route: 'archives/*courseurl',       moduleId: PLATFORM.moduleName('./components/wall/wall-view'),        name: 'archive', title: 'Archives' },
      { route: 'githubs/*courseurl',        moduleId: PLATFORM.moduleName('./components/wall/wall-view'),        name: 'github',  title: 'Repos' },
      { route: 'videos/*courseurl',         moduleId: PLATFORM.moduleName('./components/wall/wall-view'),        name: 'video',   title: 'Videos' },
      { route: 'search/*courseurl',         moduleId: PLATFORM.moduleName('./components/search/search-view'),    name: 'search',  title: 'Search' },
      { route: 'time/*courseurl/:metric',   moduleId: PLATFORM.moduleName('./components/time/tutors-time-view', "tutors-time"), name: 'time',    title: 'Tutors Time' },
      { route: 'live/*courseurl',           moduleId: PLATFORM.moduleName('./components/time/tutors-live-view', "tutors-time"), name: 'live',    title: 'Tutors Live' },
      { route: 'authorize',                 moduleId: PLATFORM.moduleName('./components/auth/authorize'),        name: 'authorize' },
      { route: 'logout',                    moduleId: PLATFORM.moduleName('./components/auth/logout'),           name: 'logout',  }
    ]);
  }
}
