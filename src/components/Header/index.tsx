import React from 'react';
import {useTranslation} from 'react-i18next';
import { useNavigate } from 'react-router';


type HeaderProps = {
    showBackButton?: boolean;
}
const Header: React.FC<HeaderProps> = ({
    showBackButton = false,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <div className="border-b-1 border-green-800 flex h-14 bg-green-800">
            {showBackButton && (
                <div className="flex items-center justify-center pl-4">
                     <i
                         className="icon-back icon_size_big cursor-pointer"
                         onClick={() => navigate(-1)}
                     />
                </div>
            )}
            <div className="flex flex-1 items-center pl-4 text-2xl text-white">
                {t('logo_text')}
            </div>
        </div>
    )
};

export default Header;
