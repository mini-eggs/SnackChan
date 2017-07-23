open Lwt;
open Cohttp;
open Cohttp_lwt_unix;
open Yojson;
open Core.Std;

/**
 * Utility function.  
 */
let build_response (status: int) (message: string) => {
  let body = `Assoc [ 
    ("status", `Int status),  
    ("message", `String message)
  ];
  Server.respond_string status::`OK body::(Yojson.Basic.pretty_to_string body);
};

/**
 * Routes.
 */
let test_token () => {
  let token = Lib.create_token "24";
  build_response 1 token ();
};

let get_token body => {
  (Cohttp_lwt_body.to_string body) >>= fun body => {
    let user_token = body
      |> Yojson.Basic.from_string 
      |> Yojson.Basic.Util.member "user_id"
      |> Yojson.Basic.Util.to_string
      |> Lib.create_token;
    build_response 1 user_token (); 
  }; 
};

let default_route () => {
  build_response 1 "Welcome to Snack Chan server" ();
};

let error_route () => {
  build_response (-1) "Error" ();
};