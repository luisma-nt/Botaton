import Chart from 'react-apexcharts';

function GraficosApex() {
  const optionsLine = {
    chart: {
      id: 'donaciones-line',
      toolbar: {
        show: false
      }
    },
    colors: ['#e2303a'],
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
    },
    title: {
      text: 'Evolución de Donaciones',
      align: 'center'
    }
  };

  const seriesLine = [
    {
      name: 'Donaciones',
      data: [12000, 19000, 15000, 25000, 22000, 30000]
    }
  ];

  const optionsPie = {
    chart: {
      type: 'donut',
    },
    colors: ['#e2303a', '#ff6b6b', '#ffa726', '#66bb6a', '#42a5f5'],
    labels: ['Empresas', 'Personas', 'Eventos', 'Fundaciones', 'Otros'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const seriesPie = [35, 25, 20, 15, 5];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Dashboard Voluntarios Teletón</h2>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <Chart 
                options={optionsLine} 
                series={seriesLine} 
                type="line" 
                height={350} 
              />
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <Chart 
                options={optionsPie} 
                series={seriesPie} 
                type="donut" 
                height={350} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraficosApex;