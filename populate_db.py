import requests
import json

personajes = [
    ("Mario", 250, "1932-01-23", None),
    ("Marta", 210, "1956-12-20", "Peluca de fuego"),
    ("Memo", 50, "2000-03-01", "Espada dorada"),
    ("Martin", 25, "1999-11-22", "Botiquin de curaciones"),
    ("Melanie", 400, "2010-09-09", "Zapatos punta de fierro"),
    ("Marisol", 34, "1920-07-07", None),
    ("Mercurio", 2500, "1818-01-01", "Bolsa de oro"),
    ("Melchor", 190, "1918-04-18", "Mochila con ruedas"),
    ("Miles", 1000, "2003-12-14", "Tela de araña"),
    ("Milagros", 259, "1998-03-14", "Capucha roja"),
    ("Mango", 2500, "1998-09-18", "Terremotos"),
    ("Maria", 120, "1968-08-08", None),
    ("Merlina", 125, "1944-04-14", "Mano andante"),
    ("Merida", 3000, "1956-06-26", "Collar de corazón valiente"),
    ("Michael", 2050, "1958-08-29", "Microfono dorado")
]

trabajos = [
    ("Pasear los perros de personajes",190000),
    ("Realizar shows artisticos", 4000000),
    ("Entrenador de habilidades extrañas", 3000001),
    ("Cocinar en el comedor popular", 409000),
    ("Mecánico automotriz", 560000)
]

personaje_tiene_trabajo = [
    (3,13,"2023-02-02",None),
    (3,14,"2022-03-01",None),
    (2,15,"1966-08-29","2009-06-25"),
    (3,9,"2012-09-07","2013-08-16"),
    (1,1,"1956-09-07","2000-12-15"),
    (4,2,"2000-03-12","2002-09-20"),
    (5,7,"1836-10-01","1900-10-09")
]

karts = [
    ("A50","verde agua",400,2),
    ("B45","azul rey",150,),
    ("N504","magenta",200,4),
    ("K09","amarillo",530,2),
    ("L2211","anaranjado",390,7),
    ("M2023","sandía",190,15),
    ("K2019","vino",245,10),
]

reinos = [
    ("Muy lejano", "Talca", 10000),
    ("Bajo el mar", "Antartica", 1000),
    ("Sal si puedes", "Vilches", 20000),
    ("7 tazas", "Molina", 500),
    ("Estratosfera", "India", 15000),
]

personaje_habita_reino = [
    (1,1,"1933-01-23",True),
    (2,2,"1957-12-20",True),
    (3,3,"2001-03-01",True),
    (4,4,"2000-11-22",True),
    (5,5,"2011-09-09",True),
    (6,1,"1921-07-07",False),
    (7,2,"1819-01-01",False),
    (8,3,"1919-04-18",False),
    (9,4,"2004-12-14",False),
    (10,5,"1999-03-14",False),
    (11,1,"1999-09-18",False),
    (12,2,"1969-08-08",False),
    (13,3,"1945-04-14",False),
    (14,4,"1957-06-26",False),
    (15,5,"1959-08-29",False)
]

defensas=[
    ("paredes gigantes"),
    ("cañones de acero"),
    ("balas de plata"),
    ("minions voladores")
]

reino_tiene_defensa = [
    (1,1),
    (3,1),
    (3,2),
    (3,3),
    (3,4),
    (2,3),
    (4,4),
    (1,3),
    (2,2),
    (5,2)
]
diplomacias = [
    (1,2,False),
    (1,3,True),
    (1,4,False),
    (3,2,False),
    (3,4,True),
    (1,5,False)
]


url = "http://localhost:3000/api/personajes"

for nombre, fuerza, fecha_nacimiento, objeto in personajes:

    print(f"Insertando {nombre}, {fuerza}, {fecha_nacimiento}, {objeto}")

    data = {
        "nombre" : nombre,
        "fuerza" : fuerza,
        "fecha_nacimiento" : fecha_nacimiento,
        "objeto" : objeto
    }

    response = requests.post(
        url = url,
        params = data
    )

    print(response.json())
    
url = "http://localhost:3000/api/trabajos"

for descripcion, sueldo in trabajos:

    print(f"Insertando {descripcion}, {sueldo}")

    data = {
        "descripcion" : descripcion,
        "sueldo" : sueldo
    }

    response = requests.post(
        url = url,
        params = data
    )

    print(response.json())
    
url = "http://localhost:3000/api/personaje_tiene_trabajo"
for id_trabajo, id_personaje, fecha_inicio, fecha_termino in personaje_tiene_trabajo:

    print(f"Insertando {id_trabajo}, {id_personaje}, {fecha_inicio}, {fecha_termino}")

    data = {
        "id_trabajo" : id_trabajo,
        "id_personaje" : id_personaje,
        "fecha_inicio" : fecha_inicio,
        "fecha_termino" : fecha_termino
    }

    response = requests.post(
        url = url,
        params = data
    )

    print(response.json())

url = "http://localhost:3000/api/karts"
for modelo, color, velocidad_maxima, id_personaje in karts:

    print(f"Insertando {modelo}, {color}, {velocidad_maxima}, {id_personaje}")

    data = {
        "modelo" : modelo,
        "color" : color,
        "velocidad_maxima" : velocidad_maxima,
        "id_personaje" : id_personaje
    }

    response = requests.post(
        url = url,
        params = data
    )

    print(response.json())

url = "http://localhost:3000/reinos"
for nombre, ubicacion, superficie in reinos:

    print(f"Insertando {nombre}, {ubicacion}, {superficie}")

    data = {
        "nombre" : nombre,
        "ubicacion" : ubicacion,
        "superficie" : superficie
    }

    response = requests.post(
        url = url,
        params = data
    )

    print(response.json())

url = "http://localhost:3000/personaje_habita_reino"
for id_personaje, id_reino, fecha_registro, es_gobernante in personaje_habita_reino:

    print(f"Insertando {id_personaje}, {id_reino}, {fecha_registro}, {es_gobernante}")

    data = {
        "id_personaje" : id_personaje,
        "id_reino" : id_reino,
        "fecha_registro" : fecha_registro,
        "es_gobernante" : es_gobernante
    }

    response = requests.post(
        url = url,
        params = data
    )

    print(response.json())

url = "http://localhost:3000/defensas"
for defensa in defensas:

    print(f"Insertando {defensa}")

    data = {
        "defensa" : defensa
    }

    response = requests.post(
        url = url,
        params = data
    )

    print(response.json())

url = "http://localhost:3000/reino_tiene_defensa"
for id_reino, id_defensa in reino_tiene_defensa:

    print(f"Insertando {id_reino}, {id_defensa}")

    data = {
        "id_reino" : id_reino,
        "id_defensa" : id_defensa
    }

    response = requests.post(
        url = url,
        params = data
    )

    print(response.json())

url = "http://localhost:3000/diplomacias"
for id_reino_1, id_reino_2, es_aliado in diplomacias:

    print(f"Insertando {id_reino_1}, {id_reino_2}, {es_aliado}")

    data = {
        "id_reino_1" : id_reino_1,
        "id_reino_2" : id_reino_2,
        "es_aliado" : es_aliado,
    }

    response = requests.post(
        url = url,
        params = data
    )

    print(response.json())
