import { Addresse } from './models/addresses';
import { Order } from './models/orders';
import { Pizza } from './models/pizzas';
import { Restaurant } from './models/restaurants';
import sequelize from './util/database';

const PORT = 8000;
const HOST = '0.0.0.0';

export async function initDb(app: any) {
    try {
        await sequelize.sync(
            { force: true } // Reset db every time
        );

        await Restaurant.create({
            name: "Chez Louisone",
            address: {
                name: "No one",
                line1: "69 Cours Forest",
                cityName: "Villeurbanne",
                cityZipCode: "69100",
                country: "France"
            },
            pizzas: [
                {
                    name: "4 Fromages",
                    description: "Retrouvez la célèbre 4 Fromages",
                    base: "BLANCHE",
                    image: "",
                    price: 9.5,
                    ingredients: [
                        {
                            name: "Comté"
                        },
                        {
                            name: "Camembert"
                        },
                        {
                            name: "Chêvre"
                        }
                    ]
                },
                {
                    name: "Margarita",
                    description: "La classique la plus classique qui existe",
                    base: "ROUGE",
                    image: "",
                    price: 7.0,
                    ingredients: [
                        {
                            name: "Tomates"
                        },
                        {
                            name: "Persil"
                        }
                    ]
                }
            ]
        }, {
            include: [{
                association: Restaurant.Addresse
            }, {
                association: Restaurant.Pizzas,
                include: [Pizza.Ingredients]
            }]
        });

        const pizza = await Pizza.findOne({ where: { name: "4 Fromages" } });

        const order = await Order.create({
            status: "VALIDE",
            payment: {
                mode: "PAYPAL",
                amount: 26.7
            }
        }, {
            include: [
                {
                    association: Order.Payment
                }
            ]
        });

        await pizza.addOrder(order, { through: { quantity: 2 } });

        app.listen(PORT, HOST);
        console.log(`Running on http://${HOST}:${PORT}`);
    } catch (error) {
        console.log(error);
    }
};