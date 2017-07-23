open Lwt;
open Cohttp_lwt_unix;

/**
 * Start.
 */
let start () => {
  Server.make callback::Handles.base_handle ()
  |> Server.create mode::(`TCP (`Port 8080))
  |> Lwt_main.run;
};
