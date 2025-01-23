export const ITEM_PER_PAGE = 10

type RouteAccessMap = {
  [key: string]: string[];
};

/**
 * A mapping of routes to the roles that have access to them.
 * 
 * This map is used to control access to different parts of the application
 * based on the user's role. Each key is a route pattern, and the value is 
 * an array of roles that are allowed to access that route.
 * 
 * The route patterns can include wildcards (e.g., "/admin(.*)") to match 
 * multiple routes.
 * 
 * Example:
 * - "/admin(.*)": Only users with the "admin" role can access routes that match this pattern.
 * - "/list/teachers": Users with "admin" or "teacher" roles can access this route.
 * - "/list/exams": Users with "admin", "teacher", "student", or "parent" roles can access this route.
 * 
 * @type {RouteAccessMap}
 */

export const routeAccessMap: RouteAccessMap = {
  "/admin(.*)": ["admin"],
  "/student(.*)": ["student"],
  "/teacher(.*)": ["teacher"],
  "/parent(.*)": ["parent"],
  "/list/teachers": ["admin", "teacher"],
  "/list/students": ["admin", "teacher"],
  "/list/parents": ["admin", "teacher"],
  "/list/subjects": ["admin"],
  "/list/classes": ["admin", "teacher"],
  "/list/exams": ["admin", "teacher", "student", "parent"],
  "/list/assignments": ["admin", "teacher", "student", "parent"],
  "/list/results": ["admin", "teacher", "student", "parent"],
  "/list/attendance": ["admin", "teacher", "student", "parent"],
  "/list/events": ["admin", "teacher", "student", "parent"],
  "/list/announcements": ["admin", "teacher", "student", "parent"],
};