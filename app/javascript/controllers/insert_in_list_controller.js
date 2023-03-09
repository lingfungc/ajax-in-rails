import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="insert-in-list"
export default class extends Controller {
  static targets = ["items", "form"];

  connect() {
    // The "this.element" is the Section where this "insert_in_list" Controls
    console.log(this.element);
    // The "this.itemsTarget" is the "Reviews" Section
    console.log(this.itemsTarget);
    // The "this.formTarget" is the "Review Form"
    console.log(this.formTarget);
  }

  send(event) {
    event.preventDefault();

    // The "this.formTarget.action" is "http://localhost:3000/restaurants/:id/reviews"
    console.log(this.formTarget.action);
    // This Contains Data of a set of Key/Value Pairs Representing the Form
    console.log(new FormData(this.formTarget));

    // * Make a POST Request to the Form with Fetch API when a Form is Submitted
    fetch(this.formTarget.action, {
      method: "POST",
      // * Tell Fetch API that the Data is in JSON Format
      headers: { Accept: "application/json" },
      // * The Content of this POST Request is the Data of the Submitted Form
      // * The is Directing to the "create.json.builder" to Find the JSON Format Data in "reviews#create"
      body: new FormData(this.formTarget),
    })
      .then((response) => response.json())
      .then((data) => {
        // This "data" Contains the HTML of the Original Form and Input Values of the Submitted Form
        // Referring to "json.form" and "json.inserted_item" in "create.json.builder"
        // Then become "data.form" and "data.inserted_item"
        console.log(data);
        // This "data.inserted_item" is the Input Values of the Form
        if (data.inserted_item) {
          // Add the New Review Content to "Reviews" Section
          this.itemsTarget.insertAdjacentHTML("beforeend", data.inserted_item);
        }
        // Reset the Form Back to Original Form (Clean up the Input Field)
        this.formTarget.outerHTML = data.form;
      });
  }
}

// * The FormData Interface
// Provides a way to construct a set of key/value pairs representing form fields and their values.
// This FormData can be sent using the fetch() or XMLHttpRequest.send() method.
// It uses the same format a form would use if the encoding type were set to "multipart/form-data".

// * The "innerHTML" and "outerHTML"
// The innerHTML property captures the HTML contents of an element.
// The outerHTML property captures the HTML that represents the element itself and its content.
