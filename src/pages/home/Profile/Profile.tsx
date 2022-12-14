import { shallowEqual } from "@babel/types";
import { Button, Empty, Layout, message, Radio, RadioChangeEvent, List } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { MyAvatar } from "../../../components/MyAvatar";
import { ANTDLOCALCHANGE } from "../../../constants/events";
import { RootState } from "../../../store";
import { events, im } from "../../../utils";
import ToolsBar from "../../../layout/ToolsBar";
import logo from '@/assets/images/logo.webp'

const { Header, Sider, Content } = Layout;

const PersonalSetting = () => {
  const { i18n, t } = useTranslation();
  const [closeAction, setCloseAction] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (window.electron) {
      setCloseAction(window.electron.getAppCloseAction());
    }
  }, []);

  const onLanguageChange = (e: RadioChangeEvent) => {
    i18n.changeLanguage(e.target.value);
    moment.locale(e.target.value);
    events.emit(ANTDLOCALCHANGE, e.target.value)
    localStorage.setItem("IMLanguage", e.target.value);
  };

  const onCloseActionChange = (e: RadioChangeEvent) => {
    window.electron.setAppCloseAction(e.target.value);
    setCloseAction((v) => !v);
  };

  return (
    <div className="personal_setting">
      <div className="personal_setting_item">
        <div className="title">{t("SelectLanguage")}</div>
        <Radio.Group onChange={onLanguageChange} value={i18n.language}>
          <Radio value="zh-cn">简体中文</Radio>
          <Radio value="en">English</Radio>
        </Radio.Group>
      </div>
      {window.electron && (
        <div className="personal_setting_item">
          <div className="title">{t("CloseAction")}</div>
          <Radio.Group onChange={onCloseActionChange} value={closeAction}>
            <Radio value={true}>{t("QuitApp")}</Radio>
            <Radio value={false}>{t("MiniSizeApp")}</Radio>
          </Radio.Group>
        </div>
      )}
    </div>
  );
};

const NewVersion = () => {
  const [version, setVersion] = useState('0.0.1');
  const data = [
    {
      title: '获取更多',
    },
    {
      title: '报告问题',
    },
    {
      title: '',
    },

  ];
  return (
    <div style={{ width: '100%', marginTop: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <img src={logo} alt="logo" style={{ width: '100px', height: '100px' }} />
      <div>9chat 版本 {version} </div>
      <div style={{ width: '100%', marginLeft: '30px' }}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.title}</a>}

              />
            </List.Item>
          )}
        />
      </div>

    </div>




  )
};

const Blacklist = () => {
  const { t } = useTranslation();
  const blackList = useSelector((state: RootState) => state.contacts.blackList, shallowEqual);
  const rmBl = (id: string) => {
    im.removeBlack(id).then((res) => message.success(t("RemoveMembersSuc")));
  };

  return (
    <div className="profile_content_bl">
      {blackList.length > 0 ? (
        blackList.map((bl) => (
          <div key={bl.userID} className="profile_content_bl_item">
            <div className="item_left">
              <MyAvatar src={bl.faceURL} size={36} />
              <div className="nick">{bl.nickname}</div>
            </div>
            <Button onClick={() => rmBl(bl.userID!)} type="link">
              {t("Remove")}
            </Button>
          </div>
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("NoData")} />
      )}
    </div>
  );
};

const Profile = () => {
  const type = (useLocation().state as any).type ?? "about";
  const [curMenu, setCurMenu] = useState("");
  const [seindex, setSeindex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    clickMenu(0)
    console.log("挂载完成")
  }, [type])


  const aboutMenus = [
    {
      title: t("CheckVersion"),
      idx: 0,
    },
    {
      title: t("NewFunctions"),
      idx: 1,
    },
    {
      title: t("ServceAggrement"),
      idx: 2,
    },
    {
      title: `9chat${t("PrivacyAgreement")}`,
      idx: 3,
    },
    {
      title: t("Copyright"),
      idx: 4,
    },
  ];

  const setMenus = [
    {
      title: t("PersonalSettings"),
      idx: 0,
    },
    {
      title: t("Blacklist"),
      idx: 1,
    },
  ];

  const clickMenu = (idx: number) => {
    switch (idx) {
      case 0:
        if (type === "set") {
          setCurMenu("ps");
          setSeindex(0)
        }
        if (type === "about") {
          setCurMenu("nv");
          setSeindex(0)
        }
        break;
      case 1:
        if (type === "set") {
          setCurMenu("bl");
          setSeindex(1)
        }
        if (type === "about") {
          setCurMenu("");
          setSeindex(1)
        }
        break;
      case 2:
        if (type === "set") {
          setCurMenu("bl");
          setSeindex(2)
        }
        if (type === "about") {
          setCurMenu("");
          setSeindex(2)
        }
        break;
      case 3:
        if (type === "set") {
          setCurMenu("bl");
          setSeindex(3)
        }
        if (type === "about") {
          setCurMenu("");
          setSeindex(3)
        }
        break;
      case 4:
        if (type === "set") {
          setCurMenu("bl");
          setSeindex(4)
        }
        if (type === "about") {
          setCurMenu("");
          setSeindex(4)
        }
        break;
      default:
        setCurMenu("");
        break;
    }
  };

  const switchContent = () => {
    switch (curMenu) {
      case "bl":
        return <Blacklist />;
      case "ps":
        return <PersonalSetting />;
      case 'nv':
        return <NewVersion />;
      default:
        return <div></div>;
    }
  };


  const selectValue = (state: RootState) => state.user.selfInfo;
  const userInfo = useSelector(selectValue, shallowEqual);
  return (

    <Layout className="profile">

      {/* <Header className="profile_header">

      </Header> */}
      <Layout>

        <Sider width="350" className="profile_sider" theme="light">
          <ToolsBar userInfo={userInfo}></ToolsBar>
          <div className="profile_sider_menu" style={{ background: 'rgb(240, 244, 248)', height: 'calc(100% - 101px)' }}>
            {(type === "about" ? aboutMenus : setMenus).map((mu) => (
              <div key={mu.idx} onClick={() => clickMenu(mu.idx)} className="profile_sider_menu_item" style={{ background: seindex == mu.idx ? '#9d9d9d' : '' }}>
                {mu.title}
              </div>
            ))}
          </div>
        </Sider>
        <Content className="profile_content">{switchContent()}</Content>
      </Layout>
    </Layout>
  );
};

export default Profile;
