


/* édition choix ville */
const city = document.querySelector("#city");

city.addEventListener('click', () => {
    city.contentEditable = true;
})

city.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        city.contentEditable = false
        main(false);
    }

})

//lancement script
main();