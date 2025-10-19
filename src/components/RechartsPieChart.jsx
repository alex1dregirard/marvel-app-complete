import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { prepareData } from './chart-utils';

const RechartsPieChart = ({ data }) => {
    // Prepare the data
    let preparedData = prepareData(data);

    // Define the colors
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    return (
        <PieChart width={300} height={224} >
            <Pie data={preparedData} dataKey="value" nameKey="name" cx={100} cy={100}  innerRadius={40} outerRadius={80} label>
                {
                    preparedData.map((entry, index) => <Cell key={`cell-${entry.index}`} fill={colors[index]} />)
                }
            </Pie>
            <Tooltip />
        </PieChart>
    );
}

export default RechartsPieChart;