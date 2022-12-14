import clsx from 'clsx';
import colors from '../../constants/colors';
import { FCC } from '../../types/general';

export type ListItemProps = {
  title?: string;
  caption?: string | JSX.Element;
  onClick?: (...args: any[]) => any;
  chevron?: boolean;
  noBorder?: boolean;
  ribbonIndex?: number;
  left?: JSX.Element;
  right?: JSX.Element;
  className?: string;
  noHover?: boolean;
  onMouseDown?: (...args: any[]) => any;
};

const ListItem: FCC<ListItemProps> = ({
  title,
  caption,
  onClick,
  chevron,
  noBorder,
  ribbonIndex,
  left,
  right,
  className,
  onMouseDown,
  noHover,
  children,
}) => {
  const listContent = (
    <>
      {ribbonIndex !== undefined && (
        <span
          className="list-item-color-bar"
          style={{
            backgroundColor:
              colors.timetableColors[ribbonIndex % colors.randomColorsLength],
          }}
        />
      )}
      {left}
      <span className="list-item-title-container column">
        {title && <span className="list-item-title title">{title}</span>}
        {Boolean(caption) && (
          <span className="list-item-caption caption">{caption}</span>
        )}
      </span>
      {right}
      {chevron && <span className="list-item-title chevron">{'\u203A'}</span>}
    </>
  );
  const renderContent = () => {
    if (children)
      return (
        <>
          <div className="center-row list-content-row">{listContent}</div>
          {children}
        </>
      );
    return listContent;
  };
  return (
    <div
      className={clsx(
        'list-item-container',
        !noBorder && 'border',
        className,
        !noHover && 'hover-bg',
        children && 'column'
      )}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {renderContent()}
    </div>
  );
};

export default ListItem;
