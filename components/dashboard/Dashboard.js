import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, Title);

const getData = async (yearset) => {
  const response = await fetch('https://api-dashboard-sigma.vercel.app/outlet/' + yearset);

  // Parse the JSON
  const datas = await response.json();
  const data = datas.data_total;
  //console.log(yearset);
  return data;
}

const getDataRs = async (yearset) => {
  const response_rs = await fetch('https://api-dashboard-sigma.vercel.app/rs/' + yearset);

  // Parse the JSON
  const datas_rs = await response_rs.json();
  const data_rs = datas_rs.data_total;
  //console.log(yearset);
  return data_rs;
}

const getDataCl = async (yearset) => {
  const response_cl = await fetch('https://api-dashboard-sigma.vercel.app/clinic/' + yearset);

  // Parse the JSON
  const datas_cl = await response_cl.json();
  const data_cl = datas_cl.data_total;
  //console.log(yearset);
  return data_cl;
}

const getDataAll = async (jns, yearset) => {
  const response_all = await fetch('https://api-dashboard-sigma.vercel.app/all/' + jns +'/'+ yearset);

  // Parse the JSON
  const datas_all = await response_all.json();
  const data_all = datas_all.data_total;
  //console.log(yearset);
  return data_all;
}

const getDataMaps = async (jns, yearset) => {
  const response_mp = await fetch('https://api-dashboard-sigma.vercel.app/maps/' + jns +'/'+ yearset);

  // Parse the JSON
  const datas_mps = await response_mp.json();
  const data_mps = datas_mps.data_total;
  //console.log(yearset);
  return data_mps;
}

const getDataSearch = async (id, sc_val) => {
  const response_sch = await fetch('https://api-dashboard-sigma.vercel.app/search/' + id + '/' + sc_val);

  // Parse the JSON
  const datas_sch = await response_sch.json();
  const data_sch = datas_sch.data_total;
  //console.log(yearset);
  return data_sch;
}

const getDataSearchMaps = async (id, sc_val) => {
  const response_sch_maps = await fetch('https://api-dashboard-sigma.vercel.app/search/' + id + '/' + sc_val);

  // Parse the JSON
  const datas_sch_maps = await response_sch_maps.json();
  const data_sch_maps = datas_sch_maps.data_total;
  //console.log(data_sch_maps);
  return data_sch_maps;
}

const getDataSummaryKl = async () => {
  const response_sum_kl = await fetch('https://api-dashboard-sigma.vercel.app/summary-kl');

  // Parse the JSON
  const datas_sum_kl = await response_sum_kl.json();
  const data_sum_kl = datas_sum_kl.data_total;
  return data_sum_kl;
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
  const [data_sch, setDataSch] = useState(null);
  const [data_sch_maps, setDataMpsSch] = useState(null);
  const [data_sum_kl, setDataSumKl] = useState(null);
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const handleClick = async () => {
    //document.getElementById("ldr").style.display = 'block';
    //document.getElementById("ldr2").style.display = 'block';
    //document.getElementById("ldr3").style.display = 'block';
    //document.getElementById("ldr4").style.display = 'block';

    const usp = document.getElementById("jenis_dt").value;
    const th_act = document.getElementById("thn_act").value;

        const endpointDataAll = await getDataAll(usp, th_act);
        setDataAll(endpointDataAll);

        const endpointDataMps = await getDataMaps(usp, th_act);
        setDataMps(endpointDataMps);
    
        const endpointData = await getData(th_act);
        setData(endpointData);

        const endpointDataRs = await getDataRs(th_act);
        setDataRs(endpointDataRs);

        const endpointDataCl = await getDataCl(th_act);
        setDataCl(endpointDataCl);

        const schMpsOld = null;
        setDataMpsSch(schMpsOld);

    //console.log(endpointDataMps);

  }

  const serachChange = async () => {
    const sch_val = document.getElementById("default-search").value;
    const idjns = document.getElementById("jenis_dt").value;
    const th_act_sch = document.getElementById("thn_act").value;

    if(sch_val){
      const endpointDataSch = await getDataSearch(idjns, sch_val);
      setDataSch(endpointDataSch);

      const endpointDataSchMaps = await getDataSearchMaps(idjns, sch_val);
      setDataMpsSch(endpointDataSchMaps);

      const mapsold = null;
      setDataMps(mapsold);
    } 
    else {
      const endpointFrmSch = await getDataMaps(idjns, th_act_sch);
      setDataMps(endpointFrmSch);
    }
  }

  const data_chart = async () => {
    const response_sum_rs = await fetch('https://api-dashboard-sigma.vercel.app/summary-rs');

    // Parse the JSON rs
    const datas_sum_rs = await response_sum_rs.json();
    const data_sum_rs = datas_sum_rs.data_total;
    const data_rsp = data_sum_rs[0]['total_rs'];

    const response_sum_ap = await fetch('https://api-dashboard-sigma.vercel.app/summary-ap');

    // Parse the JSON apotek
    const datas_sum_ap = await response_sum_ap.json();
    const data_sum_ap = datas_sum_ap.data_total;
    const data_apt = data_sum_ap[0]['total_ap'];

    const response_sum_kl = await fetch('https://api-dashboard-sigma.vercel.app/summary-kl');

    // Parse the JSON klinik
    const datas_sum_kl = await response_sum_kl.json();
    const data_sum_kl = datas_sum_kl.data_total;
    const data_kln = data_sum_kl[0]['total_kl'];

    setChartData({
    labels: ['Apotek', 'Klinik', 'RS'],
    datasets: [
      {
        label: 'Data Outlet Transaksi',
        data: [data_apt, data_kln, data_rsp],
        backgroundColor: [
          'rgba(52, 152, 219)',
          'rgba(40, 180, 99)',
          'rgba(244, 208, 63)'
        ],
        borderColor: [
          'rgba(52, 152, 219)',
          'rgba(40, 180, 99)',
          'rgba(244, 208, 63)'
        ],
        borderWidth: 1,
      },
    ]
    });
    //console.log(data_rsp);
  }

  const data_chart_bg = {
    labels: ['Apotek', 'Klinik', 'RS'],
    datasets: [
      {
        label: 'Data Outlet Potensial',
        data: [0, 0, 0],
        backgroundColor: [
          'rgba(46, 64, 83)',
          'rgba(19, 141, 117)',
          'rgba(136, 78, 160)'
        ],
        borderColor: [
          'rgba(46, 64, 83)',
          'rgba(19, 141, 117)',
          'rgba(136, 78, 160)'
        ],
        borderWidth: 1,
      },
    ],
  }

  const options_a0 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Data Outlet Transaksi',
        fontSize: 20,
      },
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: 10,
          color: 'red'
        }
      },
      datalabels: {
        color: "#ffffff",
        font: {
          size: 9,
          weight: 'bold'
        },
      },
    }
  }

  const options_a1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Data Outlet Potensial',
        fontSize: 20,
      },
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: 10,
          color: 'red'
        }
      },
      datalabels: {
        color: "#ffffff",
        font: {
          size: 9,
          weight: 'bold'
        },
      },
    }
  }

  const showSumRs = async () => {
    const endpointSumRs = await getDataSummaryRs();
    setDataSumRs(endpointSumRs);
  }

  useEffect(() => {
    data_chart();
  }, []);

  return (
    <>
      <aside className="animate__animated animate__fadeInLeft w-52 relative z-0 flex-shrink-0 hidden px-2 overflow-y-auto bg-gray-100 sm:block">
        <div className="grid">
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <p className="p-1 text-xs text-gray-900 uppercase dark:text-gray-400">Filter Data</p>
            <div className="border-b-2 m-0"></div>
            <p className="p-1 bg-gradient-to-r from-blue-400 text-xs text-gray-900 uppercase dark:text-gray-400">Select Tahun : </p>
            <div className="mr-8 ml-4">
              <div className="relative">
                <div className="rounded shadow-md my-2 relative pin-t pin-l">
                  <select id="thn_act" className="bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="0"></option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                  </select>
                </div>
              </div>
            </div>
            <p className="p-1 bg-gradient-to-r from-blue-400 text-xs text-gray-900 uppercase dark:text-gray-400">Select Jenis : </p>
            <div className="mr-8 ml-4">
              <div className="relative">
                <div className="rounded shadow-md my-2 relative pin-t pin-l">
                  <select id="jenis_dt" className="bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="0"></option>
                    <option value="1">Apotek</option>
                    <option value="2">Rumah Sakit</option>
                    <option value="3">Klinik</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="border-b-2 m-0"></div>
            <div className="mr-8 ml-4">
              <div className="relative">
                <div className="rounded shadow-md my-2 relative pin-t pin-l">
                  <button onClick={() => handleClick()}
                    className="hover:shadow-form w-full rounded-md bg-blue-400 py-1 px-4 text-center text-base font-semibold text-white outline-none"
                  >
                    Serach
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
              <div className="grid grid-cols-1 gap-4 grid-cols-2 mt-4">  
              <p className="p-0 bg-gradient-to-r from-blue-400 text-xs text-gray-900 uppercase dark:text-gray-400">SUMMARY FILTER OUTLET : </p>              
                <div className="p-1 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
                  <div className="rounded-full p-2 bg-indigo-200 flex flex-col items-center">
                  <img width="14" height="14" src="https://img.icons8.com/fluency/48/pharmacy-shop.png" alt="pharmacy-shop" />
                  </div>
                  <p className="text-xs mt-1 text-center font-semibold">
                     Total Apotek 
                  </p>
                {data &&
                  data.map((item, index) => {
                    return (
                      <div key={index}>
                        <div>{item.total_apotek}</div>
                      </div>
                    );
                  })}
                </div>

                 <div className="p-1 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
                  <div className="rounded-full p-2 bg-indigo-200 flex flex-col items-center">
                  <img width="14" height="14" src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/external-Clinic-buildings-smashingstocks-flat-smashing-stocks.png" alt="Klinik" />
                  </div>
                  <p className="text-xs mt-1 text-center font-semibold">Total Klinik</p>
                  {data_cl &&
                    data_cl.map((item_cl, index_cl) => {
                      return (
                        <div key={index_cl}>
                          <div>{item_cl.total_clinic}</div>
                        </div>
                      );
                    })}
                </div>

                <div className="p-1 flex flex-col items-center bg-white rounded-md justify-center shadow-xl cursor-pointer">
                  <div className="rounded-full p-2 bg-indigo-200 flex flex-col items-center">
                    <img width="14" height="14" src="https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/65/external-hospital-national-hiv-aids-and-aging-awareness-day-smashingstocks-circular-smashing-stocks.png" alt="external-hospital-national" />
                  </div>
                <p className="text-xs mt-1 text-center font-semibold">Total Rumah Sakit </p>
                {data_rs &&
                  data_rs.map((item_rs, index_rs) => {
                    return (
                      <div key={index_rs}>
                        <div>{item_rs.total_rs}</div>
                      </div>
                    );
                  })}
                </div>

              </div>
          </div>
        </div>
      </aside>
    
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <main className="relative z-0 flex-1 pb-8 px-0 bg-white">
          <div className="grid pb-10 mt-0">
            <div className="px-2 py-0 text-sm text-gray-900 uppercase dark:text-gray-400 bg-gradient-to-r from-blue-400">Maps Lokasi Outlet : </div>
            <div className="p-0 flex-grow">              
              <div class="flex mb-1">
                <div class="w-3/4 bg-white-500"><Maps data_mps={data_mps} data_sch_maps={data_sch_maps} /></div>
                <div class="w-1/4 bg-white-400">                  
                  <div class="box-content h-30 w-38 border p-2 bg-gradient-to-r from-blue-200 to-cyan-200">
                    <Pie data={chartData} options={options_a0} />
                  </div>
                  <div class="box-content h-30 w-38 border p-2 bg-gradient-to-r from-blue-200 to-cyan-200">
                    <Pie data={data_chart_bg} options={options_a1} />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-0 flex-grow">
              <div className="flex items-left justify-left h-45">
                <div className="relative overflow-auto">
                  <input onChange={() => serachChange()} type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Outlet..." />
                  <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                      <tr>
                        <th scope="col" className="bg-gray-200 text-gray-600 border border-gray-300 px-6 py-3">
                          Outlet name
                        </th>
                        <th scope="col" className="bg-gray-200 text-gray-600 border border-gray-300 px-6 py-3">
                          City
                        </th>
                        <th scope="col" className="bg-gray-200 text-gray-600 border border-gray-300 px-6 py-3">
                          Province
                        </th>
                        <th scope="col" className="bg-gray-200 text-gray-600 border border-gray-300 px-6 py-3">
                          Phone
                        </th>
                        <th scope="col" className="bg-gray-200 text-gray-600 border border-gray-300 px-6 py-3">
                          Total Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      {data_mps &&
                        data_mps.map((item_mps, index_mps) => {
                           let number = item_mps.total_value;
                           let nf_val = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

                          return (<tr className="bg-white dark:bg-gray-800" key={index_mps}>
                              <td className="px-6 py-4">
                                  {item_mps.outlet_name}
                              </td>
                              <td className="px-6 py-4">
                              {item_mps.outlet_city}
                              </td>
                              <td className="px-6 py-4">
                              {item_mps.outlet_province}
                              </td>
                              <td className="px-6 py-4">
                              {item_mps.hospital_phone}
                              </td>
                              <td className="px-6 py-4">
                              {nf_val}
                              </td>
                            </tr>
                          );
                      })}

                      {data_sch &&
                        data_sch.map((item_sch, index_sch) => {
                          let number_sch = item_sch.total_value;
                          let nf_val_sch = number_sch.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

                          return (<tr className="bg-white dark:bg-gray-800" key={index_sch}>
                            <td className="px-6 py-4">
                              {item_sch.outlet_name}
                            </td>
                            <td className="px-6 py-4">
                              {item_sch.outlet_city}
                            </td>
                            <td className="px-6 py-4">
                              {item_sch.outlet_province}
                            </td>
                            <td className="px-6 py-4">
                              {item_sch.hospital_phone}
                            </td>
                            <td className="px-6 py-4">
                              {nf_val_sch}
                            </td>
                          </tr>
                          );
                        })}
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

    </>
  );
}

export default Dashboard;