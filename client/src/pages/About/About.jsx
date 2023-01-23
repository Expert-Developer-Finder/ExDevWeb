import React from "react";
import "./aboutStyle.css";

export default function About() {
  return (
    <div>
      <div className="body-container">
        <div className="header">
          <h1>Expert Developer Recommender</h1>
          <p>CS 491/2 Porject</p>
        </div>
        <div className="about-project">
          <h1>About the project</h1>
          <p>
            Our team aims to implement a tool that will fasten the process of
            developers getting familiar with new code bases with a crystal clear
            understanding. Expert Developer Finder is a Visual Studio Extension
            adoptable by a wide range of users (from small private projects
            companies to tech giant companies). The extension will provide a
            list of experienced developers to the developers who are added to
            the code repository recently (e.g. interns, junior developers,
            etc.). New developers can contact the experts (with Zoom, Slack and
            email) for asking help about the specific artifacts/ code parts
            where they are confused or about the received errors. Our algorithm
            will accurately detect the true experts of the selected code part by
            investigating many artifacts. With our tool, new developers won’t
            waste their time searching for the correct developers who can truly
            help them and won’t cause further confusion about their problems.
            Thus, we believe the values we offer are vital for companies and
            developers.
          </p>
        </div>

        <div className="info-card-container">
          <h1>Team Members</h1>

          <div className="row">
            <div className="info-card">
              <img
                src={require("../../assets/about/team-members/bora.jpeg")}
                alt="Bora Altınok"
              />
              <div className="info-card-text">
                <h2>Bora Altınok</h2>
                <p>21902206</p>
                <a href="mailto:boraaltinok26@gmail.com">
                  <p>boraaltinok26@gmail.com</p>
                </a>
                <a  rel="noopener noreferrer" href="https://github.com/boraaltinok" target="_blank">
                  Visit Bora's GitHub Profile
                </a>
              </div>
            </div>

            <div className="info-card">
              <img
                src={require("../../assets/about/team-members/ege.jpg")}
                alt="Ege Ergül"
              />

              <div className="info-card-text">
                <h2>Ege Ergül</h2>
                <p>21902240</p>
                <a href="mailto:egeergull2001@gmail.com">
                  <p>egeergull2001@gmail.com</p>
                </a>
                <a  rel="noopener noreferrer" href="https://github.com/egeergul" target="_blank">
                  Visit Ege's GitHub Profile
                </a>
              </div>
            </div>

            <div className="info-card">
              <img
                src={require("../../assets/about/team-members/ali.jpg")}
                alt="Ali Eren Günaltılı"
              />

              <div className="info-card-text">
                <h2>Ali Eren Günaltılı</h2>
                <p>21801897</p>
                <a href="mailto:eren.gunaltili@ug.bilkent.edu.tr">
                  <p>eren.gunaltili@ug.bilkent.edu.tr</p>
                </a>

                <a href="https://github.com/alierengunaltili" target="_blank" rel="noopener noreferrer" >
                  Visit Ali Eren's GitHub Profile
                </a>
              </div>
            </div>
          </div>

          <div className="row">
            <div class="info-card">
              <img
                src={require("../../assets/about/team-members/ceyda.jpg")}
                alt="Ceyda Şahin"
              />

              <div class="info-card-text">
                <h2>Ceyda Şahin</h2>
                <p>21903448</p>
                <a href="mailto:ceyda.sahin@ug.bilkent.edu.tr">
                  <p>ceyda.sahin@ug.bilkent.edu.tr</p>
                </a>

                <a href="https://github.com/ceydas" target="_blank" rel="noopener noreferrer" >
                  Visit Ceyda's GitHub Profile
                </a>
              </div>
            </div>

            <div class="info-card">
              <img
                src={require("../../assets/about/team-members/tuna.png")}
                alt="Tuna Dalbeler"
              />

              <div class="info-card-text">
                <h2>Tuna Dalbeler</h2>
                <p>21802539</p>
                <a href="mailto:tuna.dalbeler@ug.bilkent.edu.tr">
                  <p>tuna.dalbeler@ug.bilkent.edu.tr</p>
                </a>

                <a href="https://github.com/contactLost" target="_blank" rel="noopener noreferrer" >
                  Visit Tunas's GitHub Profile
                </a>
              </div>
            </div>
          </div>

          <div className="row">
            <div class="info-card"  >
              <img
              style={{ objectFit:"contain"}}
                src={require("../../assets/about/team-members/eray_tuzun.jpg")}
                alt="Eray Tüzün"
              />

              <div class="info-card-text">
                <h2>Eray Tüzün</h2>
                <a href="mailto:eraytuzun@cs.bilkent.edu.tr">
                  <p>eraytuzun@cs.bilkent.edu.tr</p>
                </a>

                <a href="https://www.eraytuzun.com/index.html" target="_blank" rel="noopener noreferrer" >
                  Visit Mr. Tüzün's Website
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="footer">
        <div className="footer-body">
          <div className="mails">
            <h1>Reach to our members</h1>
            <a href="mailto:boraaltinok26@gmail.com">Bora Altınok</a>
            <a href="mailto:egeergull2001@gmail.com">Ege Ergül</a>
            <a href="mailto:ceydasahin889@gmail.com">Ceyda Şahin</a>
            <a href="mailto:alierengunaltili@gmail.com">Ali Eren Günaltılı</a>
            <a href="mailto:tuna.dalbeler@ug.bilkent.edu.tr">Tuna Dabeler</a>
          </div>
        </div>
      </div>
    </div>
  );
}
