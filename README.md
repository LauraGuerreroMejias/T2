# Install Dependencies
```
npm install
```

# Install prisma
To run next line is necessary install prisma
```
npm install @prisma/client
```

# Migrate Database PRISMA
to migrate ORM Schema to a Database model type in console (remember change **.example.env** to **.env** and the parameters inside)
```
npx prisma migrate dev
```

# RUN
to run the project type in console
```
npm run dev
```

# Documentación de la API

## CRUD

### Personajes

#### (GET) Crear personaje - /api/personajes

Parámetros:

- nombre: varchar(45) (required)
- fuerza: integer (required)
- fecha_nacimiento: date (required)
- objeto: varchar(45)

![](https://github.com/Konnits/T2/blob/main/Images/crear_personaje.png)