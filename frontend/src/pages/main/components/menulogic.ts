export const sidebarAnimation = {
    initial: {
        clipPath: "circle(0px at 1px calc(100vh / 2))",
    },
    open: {
        clipPath: "circle(65vh at 1px calc(100vh / 2))",
        transition: {
            delay: 1,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};

interface MenuCategory {
    title: string;
    items: MenuItem[];
}

interface MenuItem {
    title: string;
    icon: string;
    link: string;
}

export const menuItems: MenuCategory[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "home",
                icon: "M23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656L8.859375 15.519531C7.0554772 16.941163 6 19.113506 6 21.410156L6 40.5C6 41.863594 7.1364058 43 8.5 43L18.5 43C19.863594 43 21 41.863594 21 40.5L21 30.5C21 30.204955 21.204955 30 21.5 30L26.5 30C26.795045 30 27 30.204955 27 30.5L27 40.5C27 41.863594 28.136406 43 29.5 43L39.5 43C40.863594 43 42 41.863594 42 40.5L42 21.410156C42 19.113506 40.944523 16.941163 39.140625 15.519531L24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562L37.285156 17.876953C38.369258 18.731322 39 20.030807 39 21.410156L39 40L30 40L30 30.5C30 28.585045 28.414955 27 26.5 27L21.5 27C19.585045 27 18 28.585045 18 30.5L18 40L9 40L9 21.410156C9 20.030807 9.6307412 18.731322 10.714844 17.876953L24 7.4101562 z",
                link: "/",
            },
            {
                title: "About",
                icon: "M24 4C12.972292 4 4 12.972292 4 24C4 27.275316 4.8627078 30.334853 6.2617188 33.064453L4.09375 40.828125C3.5887973 42.631528 5.3719261 44.41261 7.1757812 43.908203L14.943359 41.740234C17.671046 43.137358 20.726959 44 24 44C35.027708 44 44 35.027708 44 24C44 12.972292 35.027708 4 24 4 z M 24 7C33.406292 7 41 14.593708 41 24C41 33.406292 33.406292 41 24 41C20.997029 41 18.192258 40.218281 15.744141 38.853516 A 1.50015 1.50015 0 0 0 14.609375 38.71875L7.2226562 40.78125L9.2851562 33.398438 A 1.50015 1.50015 0 0 0 9.1503906 32.263672C7.7836522 29.813476 7 27.004518 7 24C7 14.593708 14.593708 7 24 7 z M 23.976562 12.978516 A 1.50015 1.50015 0 0 0 22.5 14.5L22.5 26.5 A 1.50015 1.50015 0 1 0 25.5 26.5L25.5 14.5 A 1.50015 1.50015 0 0 0 23.976562 12.978516 z M 24 31 A 2 2 0 0 0 24 35 A 2 2 0 0 0 24 31 z",
                link: "/about",
            },
        ],
    },
    {
        title: "Charts",
        items: [
            {
                title: "Territory",
                icon: "M23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656L8.859375 15.519531C7.0554772 16.941163 6 19.113506 6 21.410156L6 40.5C6 41.863594 7.1364058 43 8.5 43L18.5 43C19.863594 43 21 41.863594 21 40.5L21 30.5C21 30.204955 21.204955 30 21.5 30L26.5 30C26.795045 30 27 30.204955 27 30.5L27 40.5C27 41.863594 28.136406 43 29.5 43L39.5 43C40.863594 43 42 41.863594 42 40.5L42 21.410156C42 19.113506 40.944523 16.941163 39.140625 15.519531L24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562L37.285156 17.876953C38.369258 18.731322 39 20.030807 39 21.410156L39 40L30 40L30 30.5C30 28.585045 28.414955 27 26.5 27L21.5 27C19.585045 27 18 28.585045 18 30.5L18 40L9 40L9 21.410156C9 20.030807 9.6307412 18.731322 10.714844 17.876953L24 7.4101562 z",
                link: "/territory",
            },
            {
                title: "Country",
                icon: "M24 4C12.972292 4 4 12.972292 4 24C4 27.275316 4.8627078 30.334853 6.2617188 33.064453L4.09375 40.828125C3.5887973 42.631528 5.3719261 44.41261 7.1757812 43.908203L14.943359 41.740234C17.671046 43.137358 20.726959 44 24 44C35.027708 44 44 35.027708 44 24C44 12.972292 35.027708 4 24 4 z M 24 7C33.406292 7 41 14.593708 41 24C41 33.406292 33.406292 41 24 41C20.997029 41 18.192258 40.218281 15.744141 38.853516 A 1.50015 1.50015 0 0 0 14.609375 38.71875L7.2226562 40.78125L9.2851562 33.398438 A 1.50015 1.50015 0 0 0 9.1503906 32.263672C7.7836522 29.813476 7 27.004518 7 24C7 14.593708 14.593708 7 24 7 z M 23.976562 12.978516 A 1.50015 1.50015 0 0 0 22.5 14.5L22.5 26.5 A 1.50015 1.50015 0 1 0 25.5 26.5L25.5 14.5 A 1.50015 1.50015 0 0 0 23.976562 12.978516 z M 24 31 A 2 2 0 0 0 24 35 A 2 2 0 0 0 24 31 z",
                link: "/country",
            },
            {
                title: "Latitude and Longitude",
                icon: "M23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656L8.859375 15.519531C7.0554772 16.941163 6 19.113506 6 21.410156L6 40.5C6 41.863594 7.1364058 43 8.5 43L18.5 43C19.863594 43 21 41.863594 21 40.5L21 30.5C21 30.204955 21.204955 30 21.5 30L26.5 30C26.795045 30 27 30.204955 27 30.5L27 40.5C27 41.863594 28.136406 43 29.5 43L39.5 43C40.863594 43 42 41.863594 42 40.5L42 21.410156C42 19.113506 40.944523 16.941163 39.140625 15.519531L24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562L37.285156 17.876953C38.369258 18.731322 39 20.030807 39 21.410156L39 40L30 40L30 30.5C30 28.585045 28.414955 27 26.5 27L21.5 27C19.585045 27 18 28.585045 18 30.5L18 40L9 40L9 21.410156C9 20.030807 9.6307412 18.731322 10.714844 17.876953L24 7.4101562 z",
                link: "/latitude-longitude",
            },
            {
                title: "Total Percentage",
                icon: "M24 4C12.972292 4 4 12.972292 4 24C4 27.275316 4.8627078 30.334853 6.2617188 33.064453L4.09375 40.828125C3.5887973 42.631528 5.3719261 44.41261 7.1757812 43.908203L14.943359 41.740234C17.671046 43.137358 20.726959 44 24 44C35.027708 44 44 35.027708 44 24C44 12.972292 35.027708 4 24 4 z M 24 7C33.406292 7 41 14.593708 41 24C41 33.406292 33.406292 41 24 41C20.997029 41 18.192258 40.218281 15.744141 38.853516 A 1.50015 1.50015 0 0 0 14.609375 38.71875L7.2226562 40.78125L9.2851562 33.398438 A 1.50015 1.50015 0 0 0 9.1503906 32.263672C7.7836522 29.813476 7 27.004518 7 24C7 14.593708 14.593708 7 24 7 z M 23.976562 12.978516 A 1.50015 1.50015 0 0 0 22.5 14.5L22.5 26.5 A 1.50015 1.50015 0 1 0 25.5 26.5L25.5 14.5 A 1.50015 1.50015 0 0 0 23.976562 12.978516 z M 24 31 A 2 2 0 0 0 24 35 A 2 2 0 0 0 24 31 z",
                link: "/total-percentage",
            },
        ],
    },
];
