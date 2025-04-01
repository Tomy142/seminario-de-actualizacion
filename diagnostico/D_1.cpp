#include <iostream>
#include <memory>
#include <vector>

using namespace std;

void LoginUser();

int main ()
{
    LoginUser();
    return 0;
}

class Customer{
    private:
        string user;
        string password;
    public:
        Customer(const string& user, const string& password);
        string getUser() const {return user;}
        string getPassword() const {return password;}
};

Customer ::Customer( const string& user,  const string& password) : user(user), password(password){}


class CompanyManager{
    private:
        vector<shared_ptr<Customer>>customers;
    public:
        CompanyManager();
        void CreateCustomer(const string& user,  const string& password);
        bool ValidateCustomer(const string& user, const string& password);
};

CompanyManager::CompanyManager(){
    customers.push_back(make_shared<Customer>("Juan","12345"));
    customers.push_back(make_shared<Customer>("Pedro","54321"));
    customers.push_back(make_shared<Customer>("Jose", "121212"));
};

void CompanyManager ::CreateCustomer( const string& user, const string& password){
    customers.push_back(make_shared<Customer>(user, password));
}

bool CompanyManager::ValidateCustomer(const string& user, const string& password){
    for (const auto& customer : customers){
        if(customer->getUser()== user && customer->getPassword() == password){
            return true;
        }
    } 
    return false;
}

void LoginUser()
{
    CompanyManager companyManager;
    string user;
    string password;
    string error = "Usuario y/o contraseña incorrecta";
    int trys = 0;
    int maxtrys = 3;

    cout<<"--Gestion de pedidos--"<<endl;
    
    while (trys < maxtrys){
        cout<<"Ingrese su usuario: ";
        getline(cin, user);
        cout<<"Ingrese su contraseña: ";
        getline(cin, password);

        if(companyManager.ValidateCustomer(user, password)){
            cout<<"Bienvenido, "<<user<<endl;
            return;
        }else{
            cout<<"Usuario y/o contraseña incorrecta"<<endl;
            trys++;
        }
    }
    cout<<"Usuario bloqueado. Contacte al administrador"<<endl;
}