import classNames from 'classnames';
interface Props {
  success?: boolean;
  _error?: boolean;
  top: string;
  text: any;
}

const Alerts: React.FC<Props> = ({ success, _error, top, text }) => {
  return (
    <>
      {_error && (
        <div
          className={classNames(
            ' h-12 flex items-center p-4 my-3 text-red-600 bg-red-100 border border-red-200',
            'sticky z-50 rounded-md text-sm text-left',
            top
          )}
          role="alert"
        >
          {text}
        </div>
      )}
      {success && (
        <div
          className={classNames(
            ' h-12 flex items-center p-4 my-3 text-green-600 bg-green-100 border border-green-200',
            'sticky z-50 rounded-md text-sm text-left',
            top
          )}
          role="alert"
        >
          {text}
        </div>
      )}
    </>
  );
};

export default Alerts;
