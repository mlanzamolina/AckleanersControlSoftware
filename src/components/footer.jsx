import React, { Component } from "react";

export class footer extends Component {
  render() {
    return (
      <div>
        <div class="container my-5">
          <footer class="text-center text-white">
            <div class="container">
              <hr class="my-5" />

              <section class="mb-5">
                <div class="row d-flex justify-content-center">
                  <div class="col-lg-8"></div>
                </div>
              </section>

              <section class="text-center mb-5"></section>
            </div>
            <a
              target="_blank"
              style={{}}
              href="https://www.facebook.com/Ackleaners-106521830930162"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/1200px-Facebook_icon.svg.png"
                width="90vw"
                alt="..."
              />
            </a>
            <a
              target="_blank"
              style={{}}
              href="https://www.instagram.com/ackleaners/"
            >
              <img
                src="https://aegean600.com/wp-content/uploads/instagram-logo.png"
                width="96vw"
                alt="..."
              
              />
            </a>
           

            <div class="text-center p-3">
              © 2021 Ackleaners Dev Team
            </div>
          </footer>
        </div>{" "}
      </div>
    );
  }
}

export default footer;
