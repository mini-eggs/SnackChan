open Lwt;
open Cohttp_lwt_unix;

let handle _conn (req: Cohttp.Request.t) body => {
  Lwt_io.printf "Request: %s\n" req.resource;
  switch (req.meth) {
  | `GET => (Server.respond_file "./index.html" ())
  | _ => (Server.respond_string status::`Not_found body::"" ())
  }
};

let main () => {
  Server.create mode::(`TCP (`Port 8080)) (Server.make callback::handle ())
  |> Lwt_main.run;
};

main();
