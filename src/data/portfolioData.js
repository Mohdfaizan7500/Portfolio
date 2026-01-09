// data/portfolioData.js

// Import images from assets folder
import groceryApp from '../assets/images/toptenbazar.png';
import ecommerceWeb from '../assets/images/notaryweb.png';
import fitnessTracker from '../assets/images/notarymate.png';
import portfolioWeb from '../assets/images/lumtechweb.png';
import chatApp from '../assets/images/todolist.jpg';
import dashboardUI from '../assets/images/toptenweb.png';
import lernlyst from '../assets/images/lernlyst.png';

export const tabs = [
    { id: 1, tabName: 'All' },
    { id: 2, tabName: 'App' },
    { id: 3, tabName: 'Web' },
];

export const portfolioItems = [
    {
        id: 1,
        title: 'Grocery App',
        category: 'App',
        link: 'https://github.com/rohitrkvarathe111/APP_TTB_Project',
        demoLink: 'https://grocery-app-demo.com',
        image: groceryApp
    },
    {
        id: 2,
        title: 'Notery Mate Web',
        category: 'Web',
        link: 'https://notarymate.in/',
        demoLink: 'https://notaryweb-demo.com',
        image: ecommerceWeb
    },
    {
        id: 3,
        title: 'Notary Mate',
        category: 'App',
        link: 'https://github.com/lumetechgit/Notarymate-App-New',
        demoLink: 'https://notarymate-demo.com',
        image: fitnessTracker
    },
    {
        id: 4,
        title: 'Lumetech Website',
        category: 'Web',
        link: 'https://lumetech.info/',
        demoLink: 'https://lumetech-website.com',
        image: portfolioWeb
    },
    {
        id: 5,
        title: 'Todo List App',
        category: 'App',
        link: 'https://github.com/Mohdfaizan7500/ToDo',
        demoLink: 'https://todo-app-demo.com',
        image: chatApp
    },
    {
        id: 6,
        title: 'TopTenBazar website',
        category: 'Web',
        link: 'https://toptenbazar.in/',
        demoLink: 'https://toptenbazar.com',
        image: dashboardUI
    },
    {
        id: 7,
        title: 'Learnlyst',
        category: 'App',
        link: 'https://gitlab.com/dashboard/projects',
        demoLink: 'https://lernlyst-demo.com',
        image: lernlyst
    },
];