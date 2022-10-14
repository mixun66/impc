import top_mini from "@/assets/images/top_mini.png";
import top_max from "@/assets/images/top_max.png";
import top_close from "@/assets/images/top_close.png";

const TopBar = () => {
  const miniSizeApp = () => {
    window.electron && window.electron.miniSizeApp();
  };

  const maxSizeApp = () => {
    window.electron && window.electron.maxSizeApp();
  };

  const closeApp = () => {
    window.electron && window.electron.closeApp();
  };

  return (
    <div className="top_bar" style={{ background: '#e5e4e8' }}>
      {window.electron && !window.electron.isMac && (
        <>
          <img onClick={closeApp} src={top_close} alt="" />
          <img onClick={maxSizeApp} src={top_max} alt="" />
          <img onClick={miniSizeApp} src={top_mini} alt="" />
          <span style={{ flex: '1', textAlign: 'left', marginLeft: '20px' }}>9chat</span>
        </>
      )}
    </div>
  );
};

export default TopBar;