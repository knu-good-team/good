import './App.css';
import Card from './components/Card.js'

function App() {
  const cardData = [
    {
      image: 'placeholder-image-url1',
      label: 'Label1',
      heading: '신범수',
      description: '영서의 놀이터에 초대된 1번 째 손님입니다.'
    },
    {
      image: 'placeholder-image-url2',
      label: 'Label2',
      heading: '양재현',
      description: '영서의 놀이터에 초대된 2번 째 손님입니다.'
    },
    {
      image: 'placeholder-image-url3',
      label: 'Label3',
      heading: '한영서',
      description: '저는 영서인데요?'
    }
  ];
  return (
    <div className="App">
      {cardData.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          label={card.label}
          heading={card.heading}
          description={card.description}
        />
      ))}
    </div>
  );
}

export default App;
