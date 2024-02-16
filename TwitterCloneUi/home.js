document.addEventListener("DOMContentLoaded", function () {
    const icons = ["search", "write", "like", "pf", "home"];

    icons.forEach(icon => {
        const element = document.getElementById(icon);

        if (element) {
            element.addEventListener("click", function () {
                resetIcons();
                switchIcon(icon);
            });
        }
    });

    function resetIcons() {
        icons.forEach(icon => {
            const element = document.getElementById(icon);
            if (element) {
                element.src = `assets/img/${icon}_line.svg`;
            }
        });
    }

    function switchIcon(icon) {
        const element = document.getElementById(icon);
        if (element) {
            element.src = `assets/img/${icon}_fill.svg`;
        }
    }
});
