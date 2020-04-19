const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) => 
    window
        .getComputedStyle(element)
        .getPropertyValue(style)


const initialColors = {
    colorText: getStyle(html, "--color-text"),    
    colorTitleCard: getStyle(html, "--color-titlecard"),
    colorTextBtnLike: getStyle(html, "--color-textbtnlike"),
    colorTextBtnUrl: getStyle(html, "--color-textbtnurl"),
    colorTextBtnRemove: getStyle(html, "--color-textbtnremove"),
    bg: getStyle(html, "--bg"),
    bgCards: getStyle(html, "--bg-cards"),
    bgCardsHover: getStyle(html, "--bg-cardshover"),
    bgCardsShadow: getStyle(html, "--bg-cardsshadow"),      
    bgBtnUrl: getStyle(html, "--bg-btnurl"),
    bgBtnUrlIcon: getStyle(html, "--bg-btnurlicon"),
    bgBtnUrlHover: getStyle(html, "--bg-btnurlhover"),
    btnUrlBorder: getStyle(html, "--btn-urlborder"),
    btnUrlBorderHover: getStyle(html, "--btn-urlborderhover"),
    bgBtnRemove: getStyle(html, "--bg-btnremove"),
    bgBtnRemoveIcon: getStyle(html, "--bg-btnremoveicon"),
    bgBtnRemoveHover: getStyle(html, "--bg-btnremovehover"),
    btnRemoveBorderHover: getStyle(html, "--btn-removeborderhover"),
    bgInputBorder: getStyle(html, "--bg-inputborder"),
    bgBtnAdd: getStyle(html, "--bg-btnadd"),
    bgBtnAddHover: getStyle(html, "--bg-btnaddhover"),  
    btnRemoveBorder: getStyle(html, "--btn-removeborder"),
    btnAddBorder: getStyle(html, "--btn-addborder"),
}

const darkMode = {
    colorText: "#ffffff",
    colorTitleCard: "#FFFFFF",
    colorTextBtnLike: "#fff",  
    colorTextBtnUrl: "#fff",  
    colorTextBtnRemove: "#fff",  
    bg: "#000",
    bgCards: "rgb(32, 32, 36) none repeat scroll 0% 0%",
    bgCardsHover: "rgb(4, 211, 97)",
    bgCardsShadow: "none",
    bgBtnUrl: "#7159c1",
    bgBtnUrlIcon: "#7159c1",
    bgBtnUrlHover: "none",
    btnUrlBorder: "1px solid #7159c1",
    btnUrlBorderHover: "2px solid #7159c1",    
    bgBtnRemove: "#ca4949",
    bgBtnRemoveIcon: "#ca4949",
    bgBtnRemoveHover: "1px solid #ca4949",
    btnRemoveBorderHover: "1px solid #ca4949",    
    bgInputBorder: "#fff",
    bgBtnAdd: "transparent",
    bgBtnAddHover: "#7159c1", 
    btnRemoveBorder: "none",
    btnAddBorder: "#7159c1"
}

const transformKey = key => 
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) => {
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key), colors[key]) 
    )
}

checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
})