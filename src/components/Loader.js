import appConfig from '../../config.json';

const Loader = () => {
  return (
    <>
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style jsx>{`
        @keyframes bouncing-loader {
          to {
            opacity: 0.1;
            transform: translate3d(0, -16px, 0);
          }
        }

        .bouncing-loader {
          display: flex;
          /* justify-content: center; */
        }
        .bouncing-loader > div {
          width: 16px;
          height: 16px;
          margin: 3rem 0.2rem 0 0.2rem;
          background: ${appConfig.theme.colors.primary[300]};
          border-radius: 50%;
          animation: bouncing-loader 0.6s infinite alternate;
        }

        .bouncing-loader > div:nth-child(2) {
          animation-delay: 0.2s;
        }

        .bouncing-loader > div:nth-child(3) {
          animation-delay: 0.4s;
        }
      `}</style>
    </>
  );
};

export default Loader;
