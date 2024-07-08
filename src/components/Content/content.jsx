const Content = ({judul, desc}) => {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">{judul}</h1>
        <p className="text-lg mb-8">{desc}</p>
      </div>
    );
  };
  
  export default Content;