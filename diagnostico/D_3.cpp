#include <iostream>
#include <memory>
#include <vector>
#include <unordered_map>
#include <functional>
#include <cstdlib>
#include <regex>
#include <string>

using namespace std;

void UserMenu(const string& user);
void MenuOptions(const string& user);
void Changepassword(const string& user);
bool PasswordChecker(const string& newpassword);
void Exit();


class Customer{
    private:
        string user;
        string password;
    public:
        Customer(const string& user, const string& password);
        string getUser() const {return user;}
        string getPassword() const {return password;}
        void setPassword(const string& newpassword){password = newpassword;}
};

Customer ::Customer( const string& user,  const string& password) : user(user), password(password){}


class CompanyManager{
    private:
        vector<shared_ptr<Customer>>customers;
    public:
        CompanyManager();
        void CreateCustomer(const string& user,  const string& password);
        shared_ptr<Customer> ValidateCustomer(const string& user, const string& password);
        shared_ptr<Customer> GetCustomer(const string& user);
};

CompanyManager::CompanyManager(){
    customers.push_back(make_shared<Customer>("Juan","12345"));
    customers.push_back(make_shared<Customer>("Pedro","54321"));
    customers.push_back(make_shared<Customer>("Jose", "121212"));
};

void CompanyManager ::CreateCustomer( const string& user, const string& password){
    customers.push_back(make_shared<Customer>(user, password));
}

shared_ptr<Customer>  CompanyManager::ValidateCustomer(const string& user, const string& password){
    for (const auto& customer : customers){
        if(customer->getUser()== user && customer->getPassword() == password){
            return customer;
        }
    } 
    return nullptr;
}

shared_ptr<Customer> CompanyManager::GetCustomer(const string& user)
{
    for(const auto& customer : customers){
        if(customer->getUser() == user) {
            return customer;
        }
    }
    return nullptr; 
}

void LoginUser()
{
    CompanyManager companyManager;
    string user;
    string password;
    int trys = 0;
    int maxtrys = 3;

    cout<<"--Inicio de Sesion--"<<endl;
    
    while (trys < maxtrys){
        cout<<"Ingrese su usuario: ";
        getline(cin, user);
        cout<<"Ingrese su contraseña: ";
        getline(cin, password);
        system("cls");

        if(companyManager.ValidateCustomer(user, password)){
            cout<<"Bienvenido, "<<user<<endl;
            UserMenu(user);
        }else{
            cout<<"Usuario y/o contraseña incorrecta"<<endl;
            trys++;
        }
    }
    cout<<"Usuario bloqueado. Contacte al administrador"<<endl;
}

bool PasswordChecker(const string& newpassword)
{
    regex passwordRegex("^(?=.*[A-Z])(?=.*[$!?#@%&*^-].*[$!?#@%&*^-])(?=.*[0-9])(?=.*[a-z]).{8,16}$");

    if(!regex_match(newpassword, passwordRegex)){
        cout<<"La contraseña no cumple con los requisitos"<<endl;
        cout<<"Entre 8 y 16 caracteres."<<endl;
        cout<<"Al menos una mayuscula."<<endl;
        cout<<"Al menos 2 caracteres especiales."<<endl;
        return false;
    }
    return true;
}

void Changepassword(const string& user)
{
    CompanyManager companyManager;
    string newpassword;
    

    cout<<"---Cambiar contraseña--- "<<endl;
    cout<<"Ingrese su nueva contraseña: ";
    getline(cin, newpassword);

    if(!PasswordChecker(newpassword)){
        cout<<"Por favor, intente nuevamente."<<endl;
        return;
    }

    shared_ptr<Customer> customer = companyManager.GetCustomer(user);

    if(customer) {
        customer->setPassword(newpassword);
        cout<<"Contraseña cambiada con exito."<<endl;
    }else{
        cout<<"Error al cambiar la contraseña."<<endl;
    }

}

void Exit()
{
    cout<<"Saliendo..."<<endl;
    system("cls");
    LoginUser();
}

void MenuOptions( const string& user)
{
    string option;

    

    unordered_map<string, function<void()>> Options_M ={
        {"1", [&](){Changepassword(user);}},
        {"X", Exit},
        {"x", Exit}
    };

    do{
        cout<<"Su opcion: ";
        cin>>option;
        cin.ignore();

        auto it =Options_M.find(option);
        if(it != Options_M.end()){
            it->second();
        }else{
            cout<<"Opcion invalida. Intente nuevamente"<<endl;
        }
    } while(option != "X" && option != "x");

}

void UserMenu(const string& user)
{
    
    cout<<"1. Cambiar contraseña"<<endl;
    cout<<"X. Salir"<<endl;

    MenuOptions(user);
}

int main ()
{
    LoginUser();
    return 0;
}