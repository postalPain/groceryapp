import React from 'react';
import {useTranslation} from 'react-i18next';
import { useNavigate } from 'react-router';
import './index.css';


type HeaderProps = {
    showBackButton?: boolean;
}
const Header: React.FC<HeaderProps> = ({
    showBackButton = false,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <div className="border-b-1 border-green-800 flex h-14 header">
            <div className="flex items-center justify-center w-8">
                {showBackButton && (
                     <i
                         className="icon-back icon_size_big cursor-pointer"
                         onClick={() => navigate(-1)}
                     />
                )}
            </div>
            <div className="flex flex-1 items-center text-2xl text-white">
                <img src="/logo.png" alt={t('logo_text')} className="h-14" />
            </div>
        </div>
    )
};

export default Header;
