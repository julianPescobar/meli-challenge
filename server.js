const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();

//endpoints de consulta

//por query
app.get('/api/items', cors(), (req, response) => {
    //se espera un param de nombre "search" (ej: ?search=Juego%20Persona%205%20PS4)
    const query = req.query.search;
    //para el challenge solo nos interesan los primeros 4 results
    //asi que aprovechamos que la API es grosa y viene con limit
    let url = `https://api.mercadolibre.com/sites/MLA/search?q=​${query}&limit=4`;
    https.get(url, (res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;

        });

        res.on("end", () => {
            try {
                //es requisito meterle el Author, lo insertamos.
                let json = JSON.parse(body);

                json["Author"] = { "name": 'Julián Patricio', "lastname": 'Escobar', "comments": 'gracias por la oportunidad! estuvo divertido el challenge!' }

                response.send(json);
            } catch (error) {
                console.error(error.message);
            };
        });

    }).on("error", (error) => {
        console.error(error.message);
    });

});


//por id
app.get('/api/items/:id', cors(), (req, response) => {
    //se espera un id, ej /items/MLA781955565
    const id = req.params.id;
    let url = "https://api.mercadolibre.com/items/".concat(id);
    let urlDesc = "https://api.mercadolibre.com/items/".concat(id).concat('/description');
    https.get(url, (res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;

        });
        res.on("end", () => {
            try {
                //es requisito meterle el Author, lo insertamos.
                let singleProduct = JSON.parse(body);
                //si, es otro promise anidado
                https.get(urlDesc, (res) => {
                    let bodyDesc = "";

                    res.on("data", (chunk) => {
                        bodyDesc += chunk;

                    });

                    res.on("end", () => {
                        try {

                            let productDesc = JSON.parse(bodyDesc);
                            //concatenamos la descripcion, el pdf decia que description tenia que ser de tipo String.
                            //por ende solo se agrega el texto y no todo el objeto.
                            //igual vi 2 textos, me suena a que alguno de los 2 debe venir vacio, asi que pregunto por si alguno de los 2 tiene algo.
                            singleProduct["description"] = productDesc.text ? productDesc.text : productDesc.plain_text;
                            //es requisito meterle el Author, lo insertamos.
                            singleProduct["Author"] = { "name": 'Julián Patricio', "lastname": 'Escobar', "comments": 'gracias por la oportunidad! estuvo divertido el challenge!' }
                            response.send(singleProduct)
                        } catch (error) {
                            console.error(error.message);
                        };
                    });
                }).on("error", (error) => {
                    console.error(error.message);
                });
            } catch (error) {
                console.error(error.message);
            };
        });

    }).on("error", (error) => {
        console.error(error.message);
    });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);