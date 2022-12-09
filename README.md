# Photo Library

Ce projet consiste en la conception d'une photothèque à l'aide de Node.js avec le framework Express.js. Le projet est structure en MVC (Models-Vues-Controller).

Cette photothèque contient des albums qui contiennent eux-mêmes, des photographies. Les albums peuvent être librement supprimés par le créateur de celui-ci. Dans chacun de leurs albums, les créateurs peuvent uploader et supprimer leurs propres photographies. Ils peuvent aussi créer des albums.

A l'arrivé sur l'application, l'utilisateur est représenté par le compte de "testeur anonyme".

## Packages utilisés

- [connect-flash](https://www.npmjs.com/package/connect-flash) permettant de gérer les messages d'erreurs envoyés à l'utilisateur.
- [ejs](https://www.npmjs.com/package/ejs) étant le moteur de templates utilisé.
- [express](https://www.npmjs.com/package/express) étant le framework utilisé.
- [express-fileupload](https://www.npmjs.com/package/express-fileupload) permettant de gérer les uploads.
- [express-session](https://www.npmjs.com/package/express-session) permettant de gérer les sessions.
- [jszip](https://www.npmjs.com/package/jszip) permettant de zipper ou dézipper des fichiers.
- [mongoose](https://www.npmjs.com/package/mongoose) étant l'OMD utilisé pour faire la liaison avec la base de données MangoDB.
- [rimraf](https://www.npmjs.com/package/rimraf) permettant de faire des suppressions récursives de fichiers (comme `rm -rf`).