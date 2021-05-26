cy.htmlDecode = (html) => {
    let div = document.createElement("div");
    div.innerHTML = html;
    let text = div.textContent || div.innerText || "";
    return text;
}

