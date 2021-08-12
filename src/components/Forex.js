
import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-date-picker";

export default function Forex() {
  const [post, setPost] = useState([]);
  const [value, onChange] = useState(new Date());

  const getFrom = () => {
    let today = value;
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    let from = yyyy + "-" + mm + "-" + dd;
    return from;
  };

  const pickedDate = getFrom();

  useEffect(() => {
    axios
      .get(
        `https://www.nrb.org.np/api/forex/v1/rates?page=1&per_page=5&from=${pickedDate}&to=${pickedDate}`
      )
      .then((res) => {
        setPost(res.data.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pickedDate]);

  // console.log(post);
  console.log(value);

  return (
    <div>
      <DatePicker
        onChange={onChange}
        value={value}
        format="yyyy-M-dd"
        maxDate={new Date()}
        className = "date-picker"
      />
      <table className="table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Currency</th>
            <th>Unit</th>
            <th>Buy</th>
            <th>Sell</th>
          </tr>
        </thead>

        {post.map((item) =>
          item.rates.map((item) => {
            let flagIso2 = item.currency.iso3.slice(0, 2);
            let imageUrl = `https://www.countryflags.io/${flagIso2}/flat/64.png`;
            return (
              <tbody>
                <tr key={item.currency.iso3}>
                  <td>
                    <img src={imageUrl} alt="flag" />
                  </td>
                  <td>{item.currency.iso3}</td>
                  <td>{item.currency.unit}</td>
                  <td className = "buy">{item.buy}</td>
                  <td className="sell">{item.sell}</td>
                </tr>
              </tbody>
            );
          })
        )}
      </table>
    </div>
  );
}
