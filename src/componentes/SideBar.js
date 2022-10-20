import { NavLink } from 'react-router-dom';
import classes from './SideBar.module.css';
import { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { SiGooglesheets } from 'react-icons/si';
import { FaHandshake } from 'react-icons/fa';
import { RiFeedbackFill } from 'react-icons/ri';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const SideBar = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseClick = () => {
    if (isClicked) {
      setIsClicked(false);
      console.log(isClicked);
    } else {
      setIsClicked(true);
      console.log(isClicked);
    }
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.menu}>
        <NavLink
          to="/welcome"
          className={classes.link}
          activeClassName={classes.active}
        >
          <div className={classes.icon}>
            <AiFillHome />
          </div>
          <div className={classes.link_text}>Home</div>
        </NavLink>
      </div>
      <div className={classes.menu}>
        <NavLink
          to="/products"
          className={classes.link}
          activeClassName={classes.active}
        >
          <div className={classes.icon}>
            <SiGooglesheets />
          </div>
          <div className={classes.link_text}>Fichas Técnicas</div>
        </NavLink>
      </div>
      {!isClicked && (
        <div className={classes.menu}>
          <NavLink
            onClick={handleMouseClick}
            to="/"
            className={classes.link}
            activeClassName={classes.active}
            exact
          >
            <div className={classes.icon}>
              <FaHandshake />
            </div>
            <div className={classes.link_text}>
              General <IoIosArrowDown style={{ height: '1em' }} />
            </div>
          </NavLink>
        </div>
      )}
      {isClicked && (
        <div className={classes.menu}>
          <NavLink
            onClick={handleMouseClick}
            to="/"
            className={classes.link}
            activeClassName={classes.active}
            exact
          >
            <div className={classes.icon}>
              <FaHandshake />
            </div>
            <div className={classes.link_text}>
              General <IoIosArrowUp style={{ height: '1em' }} />
            </div>
          </NavLink>
          <div className={classes.Menu}>
            <div className={classes.sub_menu}>
              <NavLink
                to="/supplier"
                className={classes.sub_link}
                activeClassName={classes.active}
              >
                Fornecedores
              </NavLink>
            </div>
            <div className={classes.sub_menu}>
              <NavLink
                to="/products"
                className={classes.sub_link}
                activeClassName={classes.active}
              >
                b
              </NavLink>
            </div>
            <div className={classes.sub_menu}>
              <NavLink
                to="/welcome"
                className={classes.sub_link}
                activeClassName={classes.active}
              >
                c
              </NavLink>
            </div>
            <div className={classes.sub_menu}>
              <NavLink
                to="/user"
                className={classes.sub_link}
                activeClassName={classes.active}
              >
                d
              </NavLink>
            </div>
          </div>
        </div>
      )}

      <div className={classes.menu}>
        <NavLink
          to="/technicalSheets"
          className={classes.link}
          activeClassName={classes.active}
        >
          <div className={classes.icon}>
            <RiFeedbackFill />
          </div>
          <div className={classes.link_text}> Matéria Prima </div>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
