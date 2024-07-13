document.addEventListener("DOMContentLoaded", () => {
    const replaceButton = document.getElementById("replace");
    const appendButton = document.getElementById("append");
    const contentDiv = document.getElementById("content");
    const showButton = document.getElementById("show");
    const resetButton = document.getElementById("reset");
    const addNameButton = document.getElementById("add-name");
    const footerFrame = document.querySelector(".footer-frame");
    const header = document.querySelector("header h1");
    let data;
    const addedTitles = new Set();
  
    // Zapamiętaj oryginalny stan nagłówka
    const originalHeaderContent = header.innerHTML;
  
    // Pobierz dane JSON z pliku ciekawostki_o_polskich_miastach.json
    fetch('content.json')
      .then(response => response.json())
      .then(json => {
        data = json.items;
      });
  
    replaceButton.addEventListener("click", () => {
      const selectedOption = document.querySelector('input[name="option"]:checked').value;
      let newContent;
      if (selectedOption === "option1") {
        newContent = `<p>${data[0].title}</p><p>${data[0].content}</p>`;
        addedTitles.clear();
        addedTitles.add(data[0].title);
      } else if (selectedOption === "option2") {
        newContent = `<p>${data[1].title}</p><p>${data[1].content}</p>`;
        addedTitles.clear();
        addedTitles.add(data[1].title);
      } else if (selectedOption === "random") {
        const randomIndex = Math.floor(Math.random() * (data.length - 2)) + 2;
        newContent = `<p>${data[randomIndex].title}</p><p>${data[randomIndex].content}</p>`;
        addedTitles.clear();
        addedTitles.add(data[randomIndex].title);
      }
      contentDiv.innerHTML = newContent;
    });
  
    appendButton.addEventListener("click", () => {
      const selectedOption = document.querySelector('input[name="option"]:checked').value;
      let newContent, newTitle;
      if (selectedOption === "option1") {
        newContent = `<p>${data[0].title}</p><p>${data[0].content}</p>`;
        newTitle = data[0].title;
      } else if (selectedOption === "option2") {
        newContent = `<p>${data[1].title}</p><p>${data[1].content}</p>`;
        newTitle = data[1].title;
      } else if (selectedOption === "random") {
        const randomIndex = Math.floor(Math.random() * (data.length - 2)) + 2;
        newContent = `<p>${data[randomIndex].title}</p><p>${data[randomIndex].content}</p>`;
        newTitle = data[randomIndex].title;
      }
  
      // Sprawdź, czy nowa treść już istnieje
      if (addedTitles.has(newTitle)) {
        // Wyświetl komunikat
        alert('Ta treść już istnieje!');
      } else {
        addedTitles.add(newTitle);
        contentDiv.innerHTML += newContent;
        // Posortuj treści alfabetycznie
        let contentArray = Array.from(contentDiv.children).map(child => child.outerHTML);
        contentArray.sort((a, b) => a.localeCompare(b));
        contentDiv.innerHTML = contentArray.join('');
      }
    });
  
    showButton.addEventListener("click", () => {
      footerFrame.style.display = footerFrame.style.display === "none" ? "block" : "none";
    });
  
    resetButton.addEventListener("click", () => {
      // Resetuj zawartość diva
      contentDiv.innerHTML = "";
      addedTitles.clear();
      // Resetuj zawartość nagłówka
      header.innerHTML = originalHeaderContent;
    });
  
    addNameButton.addEventListener("click", () => {
      if (!header.textContent.includes("Kinga Brudz")) {
        header.textContent += " - Kinga Brudz";
      }
    });
  });
  