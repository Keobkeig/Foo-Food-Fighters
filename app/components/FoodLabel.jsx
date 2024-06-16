import React from 'react';
import './foodlabel.css'; // Add appropriate CSS


const FoodDetails = ({ data }) => {

  // const foodData = {
  //   foods: [
  //     {
  //       food_name: "banana",
  //       brand_name: null,
  //       serving_qty: 1,
  //       serving_unit: "medium (7\" to 7-7/8\" long)",
  //       serving_weight_grams: 118,
  //       nf_calories: 105,
  //       nf_total_fat: 0.4,
  //       nf_saturated_fat: 0.1,
  //       nf_cholesterol: 0,
  //       nf_sodium: 1,
  //       nf_total_carbohydrate: 27,
  //       nf_dietary_fiber: 3.1,
  //       nf_sugars: 14.4,
  //       nf_protein: 1.3,
  //       nf_potassium: 422,
  //       nf_p: 26,
  //     }
  //   ]
  // };

  const { foods } = data;
  const food = foods[0];

  return (
    <section className="performance-facts">
      <header className="performance-facts__header">
        <h1 className="performance-facts__title">Nutrition Facts</h1>
        <h1 className='performance-facts__title--small'>{food.food_name}</h1>
        <p>Serving Size {food.serving_qty} {food.serving_unit} ({food.serving_weight_grams}g)</p>
        <p>Servings Per Container 1</p>
      </header>
      <table className="performance-facts__table">
        <thead>
          <tr>
            <th colSpan="3" className="small-info">Amount Per Serving</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan="2">
              <b>Calories</b>
              {food.nf_calories}
            </th>
            <td>
              Calories from Fat
              {(food.nf_total_fat * 9).toFixed(1)}
            </td>
          </tr>
          <tr className="thick-row">
            <td colSpan="3" className="small-info"><b>% Daily Value*</b></td>
          </tr>
          <tr>
            <th colSpan="2">
              <b>Total Fat</b>
              {food.nf_total_fat}g
            </th>
            <td><b>{((food.nf_total_fat / 65) * 100).toFixed(1)}%</b></td>
          </tr>
          <tr>
            <td className="blank-cell"></td>
            <th>
              Saturated Fat
              {food.nf_saturated_fat}g
            </th>
            <td><b>{((food.nf_saturated_fat / 20) * 100).toFixed(1)}%</b></td>
          </tr>
          <tr>
            <td className="blank-cell"></td>
            <th>
              Trans Fat
              0g
            </th>
            <td></td>
          </tr>
          <tr>
            <th colSpan="2">
              <b>Cholesterol</b>
              {food.nf_cholesterol}mg
            </th>
            <td><b>{((food.nf_cholesterol / 300) * 100).toFixed(1)}%</b></td>
          </tr>
          <tr>
            <th colSpan="2">
              <b>Sodium</b>
              {food.nf_sodium}mg
            </th>
            <td><b>{((food.nf_sodium / 2400) * 100).toFixed(1)}%</b></td>
          </tr>
          <tr>
            <th colSpan="2">
              <b>Total Carbohydrate</b>
              {food.nf_total_carbohydrate}g
            </th>
            <td><b>{((food.nf_total_carbohydrate / 300) * 100).toFixed(1)}%</b></td>
          </tr>
          <tr>
            <td className="blank-cell"></td>
            <th>
              Dietary Fiber
              {food.nf_dietary_fiber}g
            </th>
            <td><b>{((food.nf_dietary_fiber / 25) * 100).toFixed(1)}%</b></td>
          </tr>
          <tr>
            <td className="blank-cell"></td>
            <th>
              Sugars
              {food.nf_sugars}g
            </th>
            <td></td>
          </tr>
          <tr className="thick-end">
            <th colSpan="2">
              <b>Protein</b>
              {food.nf_protein}g
            </th>
            <td></td>
          </tr>
        </tbody>
      </table>

      <table className="performance-facts__table--grid">
        <tbody>
          <tr>
            <td colSpan="2">Potassium {food.nf_potassium}mg</td>
            <td>Phosphorus {food.nf_p}mg</td>
          </tr>
        </tbody>
      </table>

      <p className="small-info">
        * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs:
      </p>

      <table className="performance-facts__table--small small-info">
        <thead>
          <tr>
            <td colSpan="2"></td>
            <th>Calories:</th>
            <th>2,000</th>
            <th>2,500</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan="2">Total Fat</th>
            <td>Less than</td>
            <td>65g</td>
            <td>80g</td>
          </tr>
          <tr>
            <td className="blank-cell"></td>
            <th>Saturated Fat</th>
            <td>Less than</td>
            <td>20g</td>
            <td>25g</td>
          </tr>
          <tr>
            <th colSpan="2">Cholesterol</th>
            <td>Less than</td>
            <td>300mg</td>
            <td>300mg</td>
          </tr>
          <tr>
            <th colSpan="2">Sodium</th>
            <td>Less than</td>
            <td>2,400mg</td>
            <td>2,400mg</td>
          </tr>
          <tr>
            <th colSpan="3">Total Carbohydrate</th>
            <td>300g</td>
            <td>375g</td>
          </tr>
          <tr>
            <td className="blank-cell"></td>
            <th colSpan="2">Dietary Fiber</th>
            <td>25g</td>
            <td>30g</td>
          </tr>
        </tbody>
      </table>

      <p className="small-info">Calories per gram:</p>
      <p className="small-info text-center">
        Fat 9 &bull; Carbohydrate 4 &bull; Protein 4
      </p>
    </section>
  );
};

export default FoodDetails;
