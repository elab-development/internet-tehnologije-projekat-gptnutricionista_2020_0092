import React from 'react';
 import './HomePage.css';

const HomePage = () => {
  return (
    <div className="materialContainer">
      <div className="box">
        <h1 className="title">Dobrodošli u GPT Nutricionističku aplikaciju</h1>
        <p>Ovde možete dobiti personalizovane planove ishrane i treninga uz pomoć našeg AI algoritma.</p>
        <p>Pratite ove savete za zdraviji način života:</p>
        <ul>
          <li>Redovno konzumirajte voće i povrće, poput jabuka . Voće i povrće su bogati vlaknima, vitaminima i mineralima koji su esencijalni za vaše zdravlje.</li>
          <li>Bavite se fizičkom aktivnošću, kao što je trčanje   ili vežbanje u teretani  . Aktivnost pomaže u održavanju zdravog telesnog sastava, jača srce i poboljšava raspoloženje.</li>
          <li>Planirajte obroke koji su uravnoteženi i hranljivi  . Kombinujte različite grupe namirnica poput proteina, ugljenih hidrata i zdravih masti kako biste obezbedili sve potrebne hranljive sastojke.</li>
          <li>Nemojte zaboraviti na hidrataciju! Pijte dovoljno vode tokom dana kako biste održali svoje telo hidriranim i podržali sve svoje biološke funkcije.</li>
          <li>Odmorite se dovoljno. San je ključan za oporavak, regeneraciju i održavanje optimalnog zdravlja.</li>
        </ul>
      </div>
      <div className="box back"></div>
      <div className="overbox"></div>
    </div>
  );
};

export default HomePage;
