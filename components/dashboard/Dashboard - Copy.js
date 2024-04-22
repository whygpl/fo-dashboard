import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

const getData = async (yearset) => {
  const response = await fetch('http://localhost:8080/outlet/' + yearset);
  
  // Parse the JSON
  const datas = await response.json();
  const data = datas.data_total;
  //console.log(yearset);
  return data;
}

const getDataRs = async (yearset) => {
  const response_rs = await fetch('http://localhost:8080/rs/' + yearset);

  // Parse the JSON
  const datas_rs = await response_rs.json();
  const data_rs = datas_rs.data_total;
  //console.log(yearset);
  return data_rs;
}

const getDataCl = async (yearset) => {
  const response_cl = await fetch('http://localhost:8080/clinic/' + yearset);

  // Parse the JSON
  const datas_cl = await response_cl.json();
  const data_cl = datas_cl.data_total;
  //console.log(yearset);
  return data_cl;
}

const getDataAll = async (yearset) => {
  const response_all = await fetch('http://localhost:8080/all/' + yearset);

  // Parse the JSON
  const datas_all = await response_all.json();
  const data_all = datas_all.data_total;
  //console.log(yearset);
  return data_all;
}

const getDataMaps = async (yearset) => {
  const response_mp = await fetch('http://localhost:8080/maps/' + yearset);

  // Parse the JSON
  const datas_mps = await response_mp.json();
  const data_mps = datas_mps.data_total;
  //console.log(yearset);
  return data_mps;
}

const Maps = dynamic(() => import("../Maps"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [data_rs, setDataRs] = useState(null);
  const [data_cl, setDataCl] = useState(null);
  const [data_all, setDataAll] = useState(null);
  const [data_mps, setDataMps] = useState(null);

  const handleClick = async (e) => {
    document.getElementById("ldr").style.display = 'block';
    document.getElementById("ldr2").style.display = 'block';
    document.getElementById("ldr3").style.display = 'block';
    document.getElementById("ldr4").style.display = 'block';

    const endpointData = await getData(e)
    setData(endpointData)

    const endpointDataRs = await getDataRs(e)
    setDataRs(endpointDataRs)

    const endpointDataCl = await getDataCl(e)
    setDataCl(endpointDataCl)

    const endpointDataAll = await getDataAll(e)
    setDataAll(endpointDataAll)

    const endpointDataMps = await getDataMaps(e)
    setDataMps(endpointDataMps)
  }

  useEffect(() => {
    document.getElementById("ldr").style.display = 'none';
    document.getElementById("ldr2").style.display = 'none';
    document.getElementById("ldr3").style.display = 'none';
    document.getElementById("ldr4").style.display = 'none';
  });

    return (
      <main className="p-6 sm:p-10 space-y-6">

        <div className="grid xl:grid-flow-col gap-6">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
            <h2 className="text-gray-600 ml-0.5">Master Outlet Kemenkes dan GPL</h2>
          </div>
          <div className="mr-3">
            
          </div>
        </div>

        {/*<section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
              <img width="48" height="48" src="https://img.icons8.com/fluency/48/pharmacy-shop.png" alt="pharmacy-shop"/>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                
                
                 
              </span>
              <span className="block text-gray-500">Outlet Apotek</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
              <img width="48" height="48" src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/external-Clinic-buildings-smashingstocks-flat-smashing-stocks.png" alt="external-Clinic-buildings-smashingstocks-flat-smashing-stocks"/>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                

                
              </span>
              <span className="block text-gray-500">Outlet Klinik</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
              <img width="48" height="48" src="https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/65/external-hospital-national-hiv-aids-and-aging-awareness-day-smashingstocks-circular-smashing-stocks.png" alt="external-hospital-national-hiv-aids-and-aging-awareness-day-smashingstocks-circular-smashing-stocks"/>
            </div>
            <div>
              <span className="inline-block text-2xl font-bold">
                

                
              </span>
              <span className="block text-gray-500">Outlet RS</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
              <img width="48" height="48" src="https://img.icons8.com/bubbles/50/shop.png" alt="shop"/>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                
                
                
              </span>
              <span className="block text-gray-500">Jumlah All Outlet</span>
            </div>
          </div>
    </section>*/}

        <section className="flex grid xl:grid-flow-col grid-cols-2 gap-4">                   
          <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
            <div class="relative">
              <div class="absolute top-6 z-10 right-0 items-center">
                <select onChange={(e) => handleClick(e.target.value)} className="rounded-tl-lg bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="0">Tahun Aktif</option>
                  <option value="2021">Tahun 2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>    

                <aside id="default-sidebar" className="transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                  <div className="rounded-bl-lg h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <div role="status" id="ldr">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                          <img width="16" height="16" src="https://img.icons8.com/fluency/48/pharmacy-shop.png" alt="pharmacy-shop" />
                          <span className="flex-1 ms-3 whitespace-nowrap text-sm font-medium">Apotek</span>
                          <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                            {data &&
                              data.map((item, index) => {
                                return (
                                  <div key={index}>
                                    <div>{item.total_apotek}</div>
                                  </div>
                                );
                              })}
                          </span>
                        </a>
                      </li>

                      <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <div role="status" id="ldr2">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                          <img width="16" height="16" src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/external-Clinic-buildings-smashingstocks-flat-smashing-stocks.png" alt="external-Clinic-buildings-smashingstocks-flat-smashing-stocks" />
                          <span className="flex-1 ms-3 whitespace-nowrap">Klinik</span>
                          <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                            {data_cl &&
                              data_cl.map((item_cl, index_cl) => {
                                return (
                                  <div key={index_cl}>
                                    <div>{item_cl.total_clinic}</div>
                                  </div>
                                );
                              })}
                          </span>
                        </a>
                      </li>

                      <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <div role="status" id="ldr3">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                          <img width="16" height="16" src="https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/65/external-hospital-national-hiv-aids-and-aging-awareness-day-smashingstocks-circular-smashing-stocks.png" alt="external-hospital-national-hiv-aids-and-aging-awareness-day-smashingstocks-circular-smashing-stocks" />
                          <span className="flex-1 ms-3 whitespace-nowrap">RS</span>
                          <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                            {data_rs &&
                              data_rs.map((item_rs, index_rs) => {
                                return (
                                  <div key={index_rs}>
                                    <div>{item_rs.total_rs}</div>
                                  </div>
                                );
                              })}
                          </span>
                        </a>
                      </li>

                      <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <div role="status" id="ldr4">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                          <span className="flex-1 ms-3 whitespace-nowrap">All Outlet</span>
                          <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                            {data_all &&
                              data_all.map((item_all, index_all) => {
                                return (
                                  <div key={index_all}>
                                    <div>{item_all.total_all}</div>
                                  </div>
                                );
                              })}
                          </span>
                        </a>
                      </li>

                    </ul>
                  </div>
                </aside> 
              </div>
              <div class="absolute z-0 bg-blue-100 w-full">
                <div className="px-6 py-5 font-semibold border-b border-gray-100">Maps Lokasi Outlet : </div>
                  <div className="p-0 flex-grow">
                    <div className="flex items-center justify-center h-full">
                      <Maps data_mps={data_mps} />
                    </div>
                  </div>
              </div>
            </div>         
          </div>

        </section>

        {/*<section className="flex mb-4">
          <div className="flex flex-col w-full bg-white shadow rounded-lg">            


            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Color
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Apple MacBook Pro 17"
                    </th>
                    <td class="px-6 py-4">
                      Silver
                    </td>
                    <td class="px-6 py-4">
                      Laptop
                    </td>
                    <td class="px-6 py-4">
                      $2999
                    </td>
                  </tr>
                  <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Microsoft Surface Pro
                    </th>
                    <td class="px-6 py-4">
                      White
                    </td>
                    <td class="px-6 py-4">
                      Laptop PC
                    </td>
                    <td class="px-6 py-4">
                      $1999
                    </td>
                  </tr>
                  <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Magic Mouse 2
                    </th>
                    <td class="px-6 py-4">
                      Black
                    </td>
                    <td class="px-6 py-4">
                      Accessories
                    </td>
                    <td class="px-6 py-4">
                      $99
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
                            </section>*/}
      </main>
    );
}

export default Dashboard;