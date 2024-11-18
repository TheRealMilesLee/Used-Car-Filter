import "./style.css";

document.querySelector('.nav-bar').innerHTML = `
  <nav class="nav-bar">
    <ul>
  </nav>
`;

document.querySelector('#MainBody').innerHTML = `
  <div class="grid-container">
    <div class="row1 fade-in">
      ${ Graph1_OverallView() }
    </div>
    <div class="row2-left fade-in">
      ${ Graph2_DetailView() }
    </div>
    <div class="row2-right fade-in">
      ${ Graph3_DetailView() }
    </div>
  </div>
`;


document.querySelector('.footer').innerHTML = `
  <footer class="footer">
    <p>© 2024 Hengyi Li, Shu Zhang All rights reserved</p>
  </footer>
`;

