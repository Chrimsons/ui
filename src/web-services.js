const server = "http://localhost:8080/api";

export function loginAsync(email, password) {
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${server}/account/login`, config)
  .then((r) => {
    if (r.status != 200) {
      throw Error("Invalid Login");
    }
    return r.json();
  });
}

export function registerAsync(
  firstname,
  lastname,
  mobile,
  email,
  password,
  gender,
  dob
) {
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstname,
      lastname,
      mobile,
      email,
      password,
      gender,
      dob,
    }),
  };
  return fetch(`${server}/account/register`, config).then((r) => r.json());
}

export function fetchCustomersAsync(query) {
  let config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage
        .getItem("token")
        .replaceAll('"', "")}`,
    },
  };
  return fetch(`${server}/admin/customers/search?${query}`, config).then((r) =>
    r.json()
  );
}

export function fetchCustomerByIdAsync(id) {
  let config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage
        .getItem("token")
        .replaceAll('"', "")}`,
    },
  };
  return fetch(`${server}/admin/customers/${id}`, config).then((r) => r.json());
}

export function fetchCustomerLicenceAsync(userId) {
  let config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage
        .getItem("token")
        .replaceAll('"', "")}`,
    },
  };
  return fetch(`${server}/admin/licences/${userId}`, config).then((r) =>
    r.json()
  );
}

export function issueLicenceAsync(userId) {
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage
        .getItem("token")
        .replaceAll('"', "")}`,
    },
    body: JSON.stringify({ userId }),
  };
  return fetch(`${server}/admin/licences`, config).then((r) => r.json());
}
export function issuePLicenceAsync(_id) {
  let config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage
        .getItem("token")
        .replaceAll('"', "")}`,
    },
    body: JSON.stringify({ _id }),
  };
  return fetch(`${server}/admin/licences/p`, config).then((r) => r.json());
}

export function fetchLicencesAsync() {
  let config = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${localStorage
        .getItem("token")
        .replaceAll('"','')}`
    },
  };
  return fetch(`${server}/customer/licences`, config)
  
  .then(r => {    
    
    if(r.status != 200){
        throw Error("No license")
    }
    return r.json()
});


}

export function fetchLicenceByIdAsync(id) {
  let config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage
        .getItem("token")
        .replaceAll('"', "")}`,
    },
  };
  return fetch(`${server}/customer/licences/${id}`, config).then((r) =>
    r.json()
  );
}

export function addLogbookEntryAsync(licenceId, entry) {
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage
        .getItem("token")
        .replaceAll('"', "")}`,
    },
    body: JSON.stringify(entry),
  };

  return fetch(
    `${server}/customer/licences/${licenceId}/logbook-entry`,
    config
  ).then((r) => r.json());
}
