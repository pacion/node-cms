## CMS for school web page

The node.js cms app give possibilities to:

- add, edit, change order, nest menu and submenu
- add, edit, change order - color - description - images - background of "colorfulMenu" it is a section under main menu
- add and edit single pages via tinyMCE (WYSIWYG)
- add and edit pages contained in menus
- add news in set categories (colorfulMenu called buildings)
- change informations about each colorfulMenu - email, adress, phone number (top section of the page)
- add photos to the footer swiper
- upload photos
- Account management - admin can add and change password of moderators which that only can add news

The website is created with the WCAG 2.1 standard in mind (validation, performance, high contrast mode, change size of font)

## Instalation

Download & install the LTS node.js
https://nodejs.org/en/

Clone the repository.

Install all packages.
```bash
npm install
```

Rename env into .env.
Start the page in localhost:3000 - you can change the value of the port in .env file.
```bash
npm run devStart
```
The page has my settings of the mongoDB, tinyMCE API key and you can enter the CMS mode without loggining in. All possibilities are unlocked except deleting existing values.
