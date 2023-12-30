import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Add_Do from "./pages/Add_Do.jsx";
import Add_Agreement from "./pages/Agreement.jsx";
import Add_New_Society from "./pages/Society.jsx";
import Add_New_Truck from "./pages/Truck.jsx";
import Add_New_Transporter from "./pages/Transporter.jsx";
import View_Agreement from "./pages/View_Agreement.jsx";
import View_Truck from "./pages/View_Truck.jsx";
import View_Transporter from "./pages/View_Transporter.jsx";
import View_Societies from "./pages/View_Societies.jsx";
import Dhan_Awak from "./pages/Dhan_Awak.jsx";
import Home from "./components/Home_page.jsx";
import Log_in from "./pages/Log_in.jsx";
import Signup from "./pages/Signup.jsx";
import Dopanding from "./pages/Dopanding.jsx";
import Addricemill from "./pages/Addricemill.jsx";
import Paddysales from "./pages/Paddysales.jsx";
import Sudapatrak from "./pages/Sudapatrak.jsx";
import Dalalidhan from "./pages/Dalalidhan.jsx";
import Frk from "./pages/Frk.jsx";
import Dhantransporting from "./pages/Dhantransporting.jsx";
import Mohanfoodpaddy from "./pages/Mohanfoodpaddy.jsx";
import Transportermaster from "./pages/Transportermaster.jsx";
import Dhanricesocietiesrate from "./pages/Dhanricesocietiesrate.jsx";
import Lotnumbermaster from "./pages/Lotnumbermaster.jsx";
import Kochia from "./pages/Add_kochia.jsx";
import Ricedeposit from "./pages/Ricedeposit.jsx";
import View_Dhan_Awak from "./pages/View_Dhan_Awak.jsx";
import View_RiceDeposit from "./pages/View_RiceDeposit.jsx";
import View_Dalali_Dhan from "./pages/View_Dalali_Dhan.jsx";
import Brokenjawak from "./pages/Brokenjawak.jsx";
import Branjawak from "./pages/Branjawak.jsx";
import Nakkhijawak from "./pages/Nakkhijawak.jsx";
import Bhusi from "./pages/Bhusi.jsx";
import Huskjawak from "./pages/Huskjawak.jsx";
import ViewBrokenjawak from "./pages/View_broken_jawak.jsx";
import View_RiceMill from "./pages/View_RiceMill.jsx";
import View_AddDo from "./pages/View_AddDo.jsx";
import Add_Warehouse from "./pages/Add_Warehouse.jsx";
import View_Warehouse from "./pages/View_Warehouse.jsx";
import View_Kochia from "./pages/View_Kochia.jsx";
import View_Frk from "./pages/View_Frk.jsx";
import View_SudaPatrak from "./pages/View_SudaPatrak";
import Otherjawak from "./pages/Otherjawak.jsx";
import Otherawak from "./pages/Otherawak.jsx";
import View_Dopending from "./pages/View_Dopending.jsx";
import View_DhanTransporting from "./pages/View_DhanTransporting.jsx";
import Add_Party from "./pages/Add_Party.jsx";
import View_Party from "./pages/View_party.jsx";
import View_OtherAwak from "./pages/View_OtherAwak.jsx";
import View_OtherJawak from "./pages/View_OtherJawak.jsx";
import Add_Broker from "./pages/Add_Broker.jsx";
import View_Broker from "./pages/View_Broker.jsx";
import View_Husk from "./pages/View_husk.jsx";
import View_Nakkhi from "./pages/View_Nakkhi.jsx";
import View_Bran from "./pages/View_Bran.jsx";
import View_Bhushi from "./pages/View_Bhushi.jsx";
import View_RiceByType from "./pages/View_RiceByType.jsx";
import View_PaddyByType from "./pages/View_PaddyByType.jsx";
import Ricepurchased from "./pages/Ricepurchased.jsx";
import Cashdetail from "./pages/Cashdetail.jsx";
import View_BardanaType from "./pages/View_BardanaType.jsx";
import View_Cash_In_Out from "./pages/View_Cash_IN_Out.jsx";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(true);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <Sidebar>
          <Routes>
            <Route path="/Cashdetail" element={<Cashdetail />} />
            <Route path="/Ricepurchased" element={<Ricepurchased />} />
            <Route path="/Otherawak" element={<Otherawak />} />
            <Route path="/Otherjawak" element={<Otherjawak />} />
            <Route path="/Bhusi" element={<Bhusi />} />
            <Route path="/Huskjawak" element={<Huskjawak />} />
            <Route path="/Nakkhijawak" element={<Nakkhijawak />} />
            <Route path="/Branjawak" element={<Branjawak />} />
            <Route path="/Brokenjawak" element={<Brokenjawak />} />
            <Route path="/Lotnumbermaster" element={<Lotnumbermaster />} />
            <Route
              path="/Dhanricesocietiesrate"
              element={<Dhanricesocietiesrate />}
            />
            <Route path="/Ricedeposit" element={<Ricedeposit />} />
            <Route path="/Transportermaster" element={<Transportermaster />} />
            <Route path="/Mohanfoodpaddy" element={<Mohanfoodpaddy />} />
            <Route path="/Dhantransporting" element={<Dhantransporting />} />
            <Route path="/Frk" element={<Frk />} />
            <Route path="/Dalalidhan" element={<Dalalidhan />} />
            <Route path="/Sudapatrak" element={<Sudapatrak />} />
            <Route path="/Paddysales" element={<Paddysales />} />
            <Route path="/Dopanding" element={<Dopanding />} />
            <Route path="/Addricemill" element={<Addricemill />} />
            <Route path="/Dhan_Awak" element={<Dhan_Awak />} />
            <Route path="/Add_Do" element={<Add_Do />} />
            <Route path="/Add_Agreement" element={<Add_Agreement />} />
            <Route path="/Add_New_Society" element={<Add_New_Society />} />
            <Route path="/Add_kochia" element={<Kochia />} />
            <Route
              path="/Add_New_Transporter"
              element={<Add_New_Transporter />}
            />
            <Route path="/Add_New_Truck" element={<Add_New_Truck />} />
            <Route path="/View_Agreement" element={<View_Agreement />} />
            <Route path="/View_Truck" element={<View_Truck />} />
            <Route path="/View_Transporter" element={<View_Transporter />} />
            <Route path="/View_Societies" element={<View_Societies />} />
            <Route path="/View_Dhan_Awak" element={<View_Dhan_Awak />} />
            <Route path="/View_RiceDeposit" element={<View_RiceDeposit />} />
            <Route path="/View_Dalali_Dhan" element={<View_Dalali_Dhan />} />
            <Route path="/View_broken_jawak" element={<ViewBrokenjawak />} />
            <Route path="/View_RiceMill" element={<View_RiceMill />} />
            <Route path="/View_AddDo" element={<View_AddDo />} />
            <Route path="/Add_Warehouse" element={<Add_Warehouse />} />
            <Route path="/View_Warehouse" element={<View_Warehouse />} />
            <Route path="/View_Kochia" element={<View_Kochia />} />
            <Route path="/View_Frk" element={<View_Frk />} />
            <Route path="/View_SudaPatrak" element={<View_SudaPatrak />} />
            <Route path="/View_Dopending" element={<View_Dopending />} />
            <Route
              path="/View_DhanTransporting"
              element={<View_DhanTransporting />}
            />
            <Route path="/Add_Party" element={<Add_Party />} />
            <Route path="/View_Party" element={<View_Party />} />
            <Route path="/View_OtherAwak" element={<View_OtherAwak />} />
            <Route path="/View_OtherJawak" element={<View_OtherJawak />} />
            <Route path="/Add_Broker" element={<Add_Broker />} />
            <Route path="/View_Broker" element={<View_Broker />} />
            <Route path="/View_Husk" element={<View_Husk />} />
            <Route path="/View_Nakkhi" element={<View_Nakkhi />} />
            <Route path="/View_Bran" element={<View_Bran />} />
            <Route path="/View_Bhushi" element={<View_Bhushi />} />
            <Route path="/View_RiceByType" element={<View_RiceByType />} />
            <Route path="/View_PaddyByType" element={<View_PaddyByType />} />
            <Route path="/View_BardanaType" element={<View_BardanaType />} />
            <Route path="/View_Cash_In_Out" element={<View_Cash_In_Out />} />
          </Routes>
        </Sidebar>
      ) : (
        <Routes>
          <Route path="/" element={<Home onlogin={handleLogin} />} />
          <Route path="/Log_in" element={<Log_in />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
