interface Props {
  text: string;
}
const CustomFallback: React.FC<Props> = ({ text }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h4
        style={{
          padding: "20px",
          borderRadius: "10px",
          fontSize: "1.5em",
          border: "1px solid grey",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        {text}
      </h4>
    </div>
  );
};

export default CustomFallback;
