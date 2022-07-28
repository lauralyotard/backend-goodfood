import { Addresse } from './models/addresses';
import { Order } from './models/orders';
import { Pizza } from './models/pizzas';
import { Restaurant } from './models/restaurants';
import sequelize from './util/database';
import {User} from './models/users';

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
                    image: "pizza1",
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
                    image: "pizza2",
                    price: 7.0,
                    ingredients: [
                        {
                            name: "Tomates"
                        },
                        {
                            name: "Persil"
                        }
                    ]
                },
                {
                    name: "Reine",
                    description: "Une incontournable",
                    base: "ROUGE",
                    image: "pizza3",
                    price: 9.0,
                    ingredients: [
                        {
                            name: "Champignons"
                        },
                        {
                            name: "Jambon"
                        }
                    ]
                },
                {
                    name: "Bolognaise",
                    description: "Une incontournable",
                    base: "ROUGE",
                    image: "pizza4",
                    price: 10.0,
                    ingredients: [
                        {
                            name: "Carottes"
                        },
                        {
                            name: "Viande hachée"
                        },
                        {
                            name: "Tomates"
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

        await User.create({
            name: "Camille",
            lastname: "Dupont",
            phone: "+330791872635",
            email: "contact@goodfood.fr",
            password: "pws01"
        });

        await User.create({
            name: "Tom",
            lastname: "Dufour",
            phone: "+330394852649",
            email: "contact2@goodfood.fr",
            password: "pws02"
        });

        app.listen(PORT, HOST);
        console.log(`Running on http://${HOST}:${PORT}`);
    } catch (error) {
        console.log(error);
    }
};
