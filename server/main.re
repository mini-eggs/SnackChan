open Lwt;
open Cohttp_lwt_unix;
open Yojson;
open Core;

/**
 * Routes.
 */
/* let default_route () => {
  let body = "{\"message\": \"Hello world!\"}";
  Server.respond_string status::`OK body::body ();
};

let error_route () => {
  let body = "{\"message\": \"Error.\"}";
  Server.respond_string status::`Not_found body::body ();
}; */

/**
 * Handles.
 */
let get_handle conn (req: Cohttp.Request.t) body => {
  let handle () => {
    switch (req.resource) {
    | "/" => (Routes.default_route ())
    | _ => (Routes.error_route ())
    }
  };
  handle;
};

let base_handle conn (req: Cohttp.Request.t) body => {
  Lwt_io.printf "Request: %s\n" req.resource; 
  switch (req.meth) {
  | `GET => ((get_handle conn req body) ())
  | _ => (Routes.error_route ())
  }
};

/**
 * Start.
 */
let main () => {
  Server.create mode::(`TCP (`Port 8080)) (Server.make callback::base_handle ())
  |> Lwt_main.run;
};

main();
