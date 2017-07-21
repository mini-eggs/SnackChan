open Lwt;
open Cohttp_lwt_unix;

/**
 * Routes.
 */
let default_route () => {
  let body = "{\"message\": \"Hello world!\"}";
  Server.respond_string status::`OK body::body ();
};

let error_route () => {
  let body = "{\"message\": \"Error.\"}";
  Server.respond_string status::`Not_found body::body ();
};