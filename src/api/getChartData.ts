export const getChartData = async () => {
  try {
    const response = await fetch('/mock_data.json');
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error(error);
  }
};
