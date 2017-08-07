/**
 * Handles.
 */
let get_handle conn (req: Cohttp.Request.t) body => {
  fun () => {
    switch (req.resource) {
    | "/" => (Routes.default_route ())
    | "/test/token" => (Routes.test_token ())
    | "/test/send/notifcation" => (Routes.test_send_notification ())
    | _ => (Routes.error_route ())
    }
  };
};

let post_handle conn (req: Cohttp.Request.t) body => {
  fun () => {
    switch (req.resource) {
    | "/post/register-device-and-token" => Routes.post_register_device_and_token body
    /* | "/get/token" => (Routes.get_token body)
    | "/get/notification" => (Routes.test_notification body) */
    | _ => (Routes.error_route ())
    }
  };
};

let base_handle conn (req: Cohttp.Request.t) body => {
  Lwt_io.printf "Request: %s\n" req.resource; 
  switch (req.meth) {
  | `GET => ((get_handle conn req body) ())
  | `POST => ((post_handle conn req body) ())
  | _ => (Routes.error_route ())
  };
};
